import { motion } from "motion/react";
import { Mail, MessageSquare, Settings } from "lucide-react";

const Card = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-neutral-800 bg-black/80 p-6 text-white shadow-lg"
    >
      {children}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-400">{description}</p>
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-6 bg-black p-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Predictive Analytics */}
      <Card
        title="Predictive Analytics"
        description="Harness the power of data to forecast trends."
      >
        <div className="relative h-40 w-full rounded-lg bg-neutral-900">
          <div className="absolute top-4 left-4 rounded-full bg-neutral-800 px-3 py-1 text-sm">
            Risk: 42%
          </div>
          <div className="absolute bottom-6 left-8 rounded-lg bg-neutral-700 px-3 py-1 text-sm">
            Possible low
          </div>
          <div className="absolute top-16 left-20 rounded-lg bg-neutral-700 px-3 py-1 text-sm">
            Possible high
          </div>
        </div>
      </Card>

      {/* Automated Workflows */}
      <Card
        title="Automated Workflows"
        description="Streamline business processes."
      >
        <div className="flex flex-col gap-4">
          <motion.button
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2"
            whileHover={{ scale: 1.05 }}
          >
            <Settings size={18} /> Trigger
          </motion.button>
          <motion.button
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare size={18} /> Prompts
          </motion.button>
          <motion.button
            className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2"
            whileHover={{ scale: 1.05 }}
          >
            <Mail size={18} /> Send Email
          </motion.button>
        </div>
      </Card>

      {/* NLP Analysis */}
      <Card
        title="Natural Language Processing"
        description="Enhance customer interactions with AI."
      >
        <div className="relative h-40 w-full rounded-lg bg-neutral-900">
          <div className="absolute top-4 left-4 rounded-full bg-neutral-800 px-3 py-1 text-sm">
            August 2024
          </div>
          <div className="absolute right-8 bottom-6 rounded-full bg-neutral-800 px-3 py-1 text-sm">
            5.6%
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
