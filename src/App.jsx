import { AmisProvider, useAmis } from './context/AmisContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AriaDrawer from './components/layout/AriaDrawer';
import Tab01Home from './tabs/Tab01Home';
import Tab02AircraftHealth from './tabs/Tab02AircraftHealth';
import Tab03PartHealth from './tabs/Tab03PartHealth';
import Tab04CbmPlus from './tabs/Tab04CbmPlus';
import Tab05Configuration from './tabs/Tab05Configuration';
import Tab06PerformanceTrending from './tabs/Tab06PerformanceTrending';
import Tab07Rcm from './tabs/Tab07Rcm';
import Tab08Logistics from './tabs/Tab08Logistics';
import Tab09Engineering from './tabs/Tab09Engineering';
import Tab10IetmViewer from './tabs/Tab10IetmViewer';
import Tab11Parts3dViewer from './tabs/Tab11Parts3dViewer';
import Tab12MbseDiagram from './tabs/Tab12MbseDiagram';
import Tab13MetaLoop from './tabs/Tab13MetaLoop';
import Tab14AriaIntelligence from './tabs/Tab14AriaIntelligence';
import Tab15DatabaseQuery from './tabs/Tab15DatabaseQuery';
import Tab16DatabaseSchema from './tabs/Tab16DatabaseSchema';
import Tab17OntologyMap from './tabs/Tab17OntologyMap';
import Tab18Performance from './tabs/Tab18Performance';

const TAB_COMPONENTS = {
  1: Tab01Home,
  2: Tab02AircraftHealth,
  3: Tab03PartHealth,
  4: Tab04CbmPlus,
  5: Tab05Configuration,
  6: Tab06PerformanceTrending,
  7: Tab07Rcm,
  8: Tab08Logistics,
  9: Tab09Engineering,
  10: Tab10IetmViewer,
  11: Tab11Parts3dViewer,
  12: Tab12MbseDiagram,
  13: Tab13MetaLoop,
  14: Tab14AriaIntelligence,
  15: Tab15DatabaseQuery,
  16: Tab16DatabaseSchema,
  17: Tab17OntologyMap,
  18: Tab18Performance,
};

function MainContent() {
  const { activeTab } = useAmis();
  const TabComponent = TAB_COMPONENTS[activeTab] || (() => <div className="p-4 text-xs font-mono">Select a valid tab.</div>);


  return (
    <main className="flex-1 overflow-hidden flex flex-col min-w-0">
      <TabComponent />
    </main>
  );
}

export default function App() {
  return (
    <AmisProvider>
      <div className="h-full flex bg-amis-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <MainContent />
        </div>
        <AriaDrawer />
      </div>
    </AmisProvider>
  );
}
