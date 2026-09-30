import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DestinationsShowcase } from './components/DestinationsShowcase';
import { TripPlannerForm } from './components/TripPlannerForm';
import { ItineraryDossier } from './components/ItineraryDossier';
import { WorkflowExplainer } from './components/WorkflowExplainer';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { N8nModal } from './components/N8nModal';
import { CuratedDestination, GeneratedItinerary, TripFormData } from './types/travel';

const N8N_URL = 'https://yelamanchalisaipriya.app.n8n.cloud/form/55518f9f-408d-4aca-9194-4d81a6963c09';

export default function App() {
  const [activeItinerary, setActiveItinerary] = useState<GeneratedItinerary | null>(null);
  const [plannerValues, setPlannerValues] = useState<Partial<TripFormData>>({
    from: 'San Francisco',
    destination: 'Kyoto, Japan',
    budget: 3200,
  });
  const [isN8nModalOpen, setIsN8nModalOpen] = useState(false);
  const [isN8nConnected, setIsN8nConnected] = useState(true);

  // Check n8n status on load
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch('/api/n8n/status');
        if (res.ok) {
          const data = await res.json();
          setIsN8nConnected(data.connected);
        }
      } catch {
        // Fallback assumes operational
        setIsN8nConnected(true);
      }
    }
    checkStatus();
  }, []);

  const handleScrollToPlanner = () => {
    const el = document.getElementById('planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickStart = (params: { from: string; destination: string; budget: number }) => {
    setPlannerValues((prev) => ({
      ...prev,
      from: params.from,
      destination: params.destination,
      budget: params.budget,
    }));
  };

  const handleSelectDestination = (dest: CuratedDestination) => {
    const start = new Date();
    start.setDate(start.getDate() + 21);
    const end = new Date(start);
    end.setDate(end.getDate() + dest.recommendedDays);

    setPlannerValues((prev) => ({
      ...prev,
      destination: `${dest.title}, ${dest.country}`,
      budget: dest.suggestedBudget,
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    }));

    handleScrollToPlanner();
  };

  const handleFormSuccess = (itinerary: GeneratedItinerary) => {
    setActiveItinerary(itinerary);
    setTimeout(() => {
      const el = document.getElementById('dossier');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleResetDossier = () => {
    setActiveItinerary(null);
    handleScrollToPlanner();
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans-body">
      {/* Top Navigation */}
      <Header
        onOpenN8nModal={() => setIsN8nModalOpen(true)}
        onScrollToPlanner={handleScrollToPlanner}
        isConnected={isN8nConnected}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onQuickStart={handleQuickStart}
          onScrollToPlanner={handleScrollToPlanner}
        />

        {/* Curated Destinations Carousel/Grid */}
        <DestinationsShowcase
          onSelectDestination={handleSelectDestination}
        />

        {/* Interactive Trip Planner Form (Mapped to n8n URL fields) */}
        <TripPlannerForm
          initialValues={plannerValues}
          onSuccess={handleFormSuccess}
          onOpenN8nModal={() => setIsN8nModalOpen(true)}
        />

        {/* Display Generated Itinerary Dossier upon generation */}
        {activeItinerary && (
          <ItineraryDossier
            itinerary={activeItinerary}
            onReset={handleResetDossier}
            onOpenN8nModal={() => setIsN8nModalOpen(true)}
          />
        )}

        {/* How The Travelling Agent Pipeline Works */}
        <WorkflowExplainer
          onOpenModal={() => setIsN8nModalOpen(true)}
          isConnected={isN8nConnected}
        />

        {/* Deep Feature & FAQ Section */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={() => setIsN8nModalOpen(true)}
        onScrollToTop={handleScrollToTop}
      />

      {/* Inspect n8n Workflow Modal */}
      <N8nModal
        isOpen={isN8nModalOpen}
        onClose={() => setIsN8nModalOpen(false)}
        n8nUrl={N8N_URL}
      />
    </div>
  );
}
