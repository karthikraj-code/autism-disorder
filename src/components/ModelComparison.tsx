
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export default function ModelComparison() {
  const [metrics, setMetrics] = useState<ModelMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch actual metrics from an API
    // Here we're using static data for demonstration
    setTimeout(() => {
      setMetrics([
        {
          name: "Logistic Regression",
          accuracy: 0.82,
          precision: 0.81,
          recall: 0.79,
          f1Score: 0.80,
        },
        {
          name: "Random Forest",
          accuracy: 0.87,
          precision: 0.86,
          recall: 0.85,
          f1Score: 0.85,
        },
        {
          name: "SVM",
          accuracy: 0.84,
          precision: 0.82,
          recall: 0.83,
          f1Score: 0.82,
        },
        {
          name: "XGBoost",
          accuracy: 0.89,
          precision: 0.88,
          recall: 0.87,
          f1Score: 0.87,
        },
        {
          name: "Neural Network",
          accuracy: 0.86,
          precision: 0.85,
          recall: 0.84,
          f1Score: 0.84,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-md">
          <p className="font-semibold text-indigo-800">{data.name}</p>
          <p className="text-sm">
            <span className="font-medium">Accuracy:</span> {(data.accuracy * 100).toFixed(1)}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Precision:</span> {(data.precision * 100).toFixed(1)}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Recall:</span> {(data.recall * 100).toFixed(1)}%
          </p>
          <p className="text-sm">
            <span className="font-medium">F1 Score:</span> {(data.f1Score * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
          </div>
        ) : (
          <>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    domain={[0, 1]}
                  />
                  <Tooltip content={customTooltip} />
                  <Legend />
                  <Bar dataKey="accuracy" name="Accuracy" fill="#8884d8" />
                  <Bar dataKey="precision" name="Precision" fill="#82ca9d" />
                  <Bar dataKey="recall" name="Recall" fill="#ffc658" />
                  <Bar dataKey="f1Score" name="F1 Score" fill="#ff8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-2">About the Models</h4>
              <p className="text-sm text-gray-600 mb-4">
                These classification models have been trained on standardized autism screening datasets. 
                Each model has its strengths in identifying different patterns associated with autism spectrum conditions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-indigo-800">Logistic Regression</h5>
                  <p className="text-gray-600">
                    A simple but effective linear model that works well for binary classification problems.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-800">Random Forest</h5>
                  <p className="text-gray-600">
                    Ensemble model that combines multiple decision trees for improved accuracy and robustness.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-800">Support Vector Machine (SVM)</h5>
                  <p className="text-gray-600">
                    Effective at finding optimal boundaries between classes in high-dimensional spaces.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-800">XGBoost</h5>
                  <p className="text-gray-600">
                    Advanced gradient boosting algorithm that often achieves state-of-the-art results on classification tasks.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-indigo-800">Neural Network</h5>
                  <p className="text-gray-600">
                    Deep learning model that can capture complex non-linear relationships in the data.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
