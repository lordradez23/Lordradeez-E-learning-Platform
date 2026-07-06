import { MetricCard, AdminTransactionTable } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInstructorBySlugAction } from "@/actions/instructorActions";
import Link from "next/link";
import { Courses } from "@/components";
import { mentorTransactions } from "@/constants";

const EditMentor = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const instructor = await getInstructorBySlugAction(slug);
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Edit Mentor</h1>
          <p className="text-muted-foreground">Information Identity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Mentor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mentor Profile */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={(instructor?.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                      alt="Robert Anderson"
                    />
                    <AvatarFallback>{instructor?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-bold">{instructor?.name}</h2>
                    <h3 className="text-base text-muted-foreground font-medium">{instructor?.headline}</h3>
                    <p className="text-muted-foreground text-sm">{instructor?.summary}</p>

                    <div className="space-y-2">
                      <h3 className="font-semibold">Contact me</h3>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-muted-foreground">{instructor?.linkedinUrl}</span>
                        <span className="text-muted-foreground">{instructor?.websiteUrl}</span>
                      </div>
                      <Link href={`/instructors/${instructor?.slug}`}>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          Profile →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transaction */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Transaction</h2>
              <AdminTransactionTable transactions={mentorTransactions} />
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button variant="link">View All →</Button>
            </div>

            {/* My Course */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">My Course</h2>
              <Courses courses={instructor?.courses} />
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Information Courses</h3>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard title="Total Course" value={instructor?.courses?.length || 0} className="text-center" />
                <MetricCard title="Total Students" value={instructor?.totalStudents || 0} className="text-center" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Information Income</h3>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard title="Total Revenue" value="$7200" className="text-center" />
                <MetricCard title="Success Transfer" value="$2000" className="text-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMentor;
