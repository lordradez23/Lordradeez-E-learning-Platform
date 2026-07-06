import { Users, UserPlus, BookOpen, DollarSign } from "lucide-react";
import { getAllUsersAction, getNewStudentsAction } from "@/actions/userActions";
import { getCoursesAction } from "@/actions/courseActions";
import { StatsCard, EarningChart, TransactionTable } from "@/components";

const page = async () => {
  const students = await getAllUsersAction();
  const newStudents = await getNewStudentsAction();
  const courses = await getCoursesAction();
  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1">
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard title="Total Student" value={students?.length || 0} icon={<Users />} change="66% increase" trend="up" />
            <StatsCard title="New Student" value={newStudents?.length || 0} icon={<UserPlus />} change="96% increase" trend="up" />
            <StatsCard title="Total Course" value={courses?.length || 0} icon={<BookOpen />} change="26% increase" trend="up" />
            <StatsCard title="Total Revenue" value="$7262" icon={<DollarSign />} change="76% increase" trend="up" />
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EarningChart />
            <TransactionTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
