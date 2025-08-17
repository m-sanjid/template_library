import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { componentPath, componentName } = body;

    if (!componentPath || !componentName) {
      return NextResponse.json(
        { error: "Missing componentPath or componentName" },
        { status: 400 },
      );
    }

    // Resolve path alias
    const resolvedComponentPath = componentPath.startsWith("@/")
      ? path.join(process.cwd(), "src", componentPath.replace("@/", ""))
      : path.resolve(process.cwd(), componentPath);

    console.log("🔎 Resolved Path:", resolvedComponentPath);

    if (!fs.existsSync(resolvedComponentPath)) {
      return NextResponse.json(
        { error: "Component file not found" },
        { status: 404 },
      );
    }

    const componentCode = fs.readFileSync(resolvedComponentPath, "utf8");

    const ast = parse(componentCode, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    let extractedNode = null;
    ast.program.body.forEach((node) => {
      if (
        node.type === "VariableDeclaration" &&
        node.declarations[0]?.id?.type === "Identifier" &&
        node.declarations[0]?.id?.name === componentName
      ) {
        extractedNode = node;
      }
    });

    if (!extractedNode) {
      return NextResponse.json(
        { error: `Component ${componentName} not found` },
        { status: 404 },
      );
    }

    const extractedCode = generate(extractedNode).code;
    return NextResponse.json({ code: extractedCode }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
