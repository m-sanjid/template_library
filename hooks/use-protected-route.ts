import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSubscription } from "@/hooks/use-subscription";
import { PRICING } from "@/lib/config";

interface UseProtectedRouteOptions {
	requiresSubscription?: boolean;
	requiredFeature?: string;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
	const { requiresSubscription = false, requiredFeature } = options;
	const router = useRouter();
	const { data: session, status } = useSession();
	const { subscription, isLoading: isLoadingSubscription } = useSubscription();

	useEffect(() => {
		if (status === "loading" || isLoadingSubscription) {
			return;
		}

		// Redirect to login if not authenticated
		if (status === "unauthenticated") {
			router.push(
				`/login?callbackUrl=${encodeURIComponent(window.location.href)}`,
			);
			return;
		}

		if (requiresSubscription || requiredFeature) {
			// Check if user has an active subscription
			if (subscription?.status !== "active") {
				router.push("/pricing");
				return;
			}

			// Check if the subscription plan has access to the required feature
			if (requiredFeature) {
				const plan = Object.entries(PRICING).find(
					([_, p]) => p.name === subscription?.plan,
				)?.[1];

				if (!plan?.features.includes(requiredFeature)) {
					router.push("/pricing");
					return;
				}
			}
		}
	}, [
		status,
		isLoadingSubscription,
		subscription,
		requiresSubscription,
		requiredFeature,
		router,
	]);

	return {
		isLoading: status === "loading" || isLoadingSubscription,
		isAuthenticated: status === "authenticated",
		hasRequiredSubscription:
			!requiresSubscription ||
			(subscription?.status === "active" &&
				(!requiredFeature ||
					Object.entries(PRICING)
						.find(([_, p]) => p.name === subscription.plan)?.[1]
						?.features.includes(requiredFeature))),
	};
}
