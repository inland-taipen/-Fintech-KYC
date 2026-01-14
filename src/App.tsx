import { KYCWizard } from './components/KYCWizard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">KYC & Onboarding</h1>
          <p className="text-gray-600">Complete your verification to get started</p>
        </div>
        <KYCWizard />
      </div>
    </div>
  );
}

export default App;
