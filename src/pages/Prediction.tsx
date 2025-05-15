
import { useState } from "react";
import Hero from "@/components/Hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PredictionForm from "@/components/PredictionForm";
import ModelComparison from "@/components/ModelComparison";
import { Card, CardContent } from "@/components/ui/card";

const Prediction = () => {
  const [predictionResult, setPredictionResult] = useState<any>(null);
  
  return (
    <div className="min-h-screen">
      <Hero
        title="Autism Screening Tool"
        subtitle="Use machine learning models to help identify potential autism spectrum traits"
      />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="screening" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="screening">Screening Tool</TabsTrigger>
            <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="screening">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <PredictionForm onPredictionResult={setPredictionResult} />
                  
                  {predictionResult && (
                    <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Prediction Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(predictionResult).map(([model, result]: [string, any]) => (
                          <div key={model} className="bg-white p-4 rounded-md shadow-sm">
                            <h4 className="font-medium text-indigo-800">{model}</h4>
                            <div className="mt-2">
                              <div className="flex justify-between">
                                <span>Prediction:</span>
                                <span className="font-semibold">
                                  {result.prediction === 1 ? "Positive" : "Negative"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Confidence:</span>
                                <span className="font-semibold">
                                  {(result.confidence * 100).toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-sm text-gray-500">
                        <p className="font-semibold">Important Note:</p>
                        <p>This tool is not a diagnostic instrument. A positive prediction suggests professional evaluation may be beneficial. A medical professional should be consulted for proper diagnosis.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="max-w-4xl mx-auto">
              <ModelComparison />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Prediction;
