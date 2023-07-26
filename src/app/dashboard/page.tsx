import Header from "@/components/Header";
import Private from "@/routes/Private";
import DashboardHeader from "@/components/PanelHeader";

export default function Dashboard() {
  return (
    <Private>
      <div>
        <Header />
        <DashboardHeader />
      </div>
    </Private>
  );
}
