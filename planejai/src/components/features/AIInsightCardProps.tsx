import "react-loading-skeleton/dist/skeleton.css";

import { useInsight } from "@/hooks/useInsight";
import { Content } from "./Insights/Content";
import { Error } from "./Insights/Error";
import Skeleton from "react-loading-skeleton";

interface AIInsightCardProps {
  simulationId: string;
}

export function AIInsightCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  console.log(insight);

  return (
    <>
      <div className="bg-card rounded-2x1 shadow[4px_4px_18px_0px_rgba(0,0,0,0.2)] l:col-span-2 order-2 p-6 lg:order-1">
        <div className="mb-3 flex items-center gap-1.5">
          <span>☆</span>
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">
            Insight Financeiro Personalizado
          </span>
        </div>

        {isLoading && (
          <>
            <div className="flex">
              <Skeleton
                count={10.5}
                baseColor="var(--color-skeleton-base)"
                highlightColor="var(--color-skeleton-highlight)"
                className="mb-3 flex rounded-lg"
                containerClassName="flex-1"
                inline
              />
            </div>
          </>
        )}
        {!isLoading && error && (
          <Error
            simulationId={simulationId}
            message={error}
            onRetry={() => fetchInsight(simulationId)}
          />
        )}
        {!isLoading && insight && !error && <Content insight={insight} />}
      </div>
    </>
  );
}
