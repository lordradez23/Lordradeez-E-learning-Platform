import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { getAllUsersAction } from "@/actions/userActions";

const page = async () => {
  const students = await getAllUsersAction();

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1">
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">All Student</h1>
            <p className="text-muted-foreground">Student List</p>
          </div>

          <Card className="w-full">
            <CardContent className="p-0">
              <div className="hidden lg:block overflow-x-auto">
                <Table className="min-w-[700px]">
                  <TableHeader>
                    <TableRow className="border-b border-border">
                      <TableHead className="text-muted-foreground font-medium p-6">Username</TableHead>
                      <TableHead className="text-muted-foreground font-medium p-6">University</TableHead>
                      <TableHead className="text-muted-foreground font-medium p-6">Email</TableHead>
                      <TableHead className="text-muted-foreground font-medium p-6">Total Course</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student, index) => (
                      <TableRow key={index} className="border-b border-border hover:bg-muted/50">
                        <TableCell className="p-6 font-medium text-foreground">{student.username}</TableCell>
                        <TableCell className="p-6 text-foreground">{student.university}</TableCell>
                        <TableCell className="p-6 text-foreground">{student.email}</TableCell>
                        <TableCell className="p-6 text-foreground">{student.enrollments.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="grid gap-4 lg:hidden mt-4">
                {students.map((student, index) => (
                  <div key={index} className="border rounded-lg p-4 shadow-sm bg-card">
                    <p>
                      <span className="font-semibold">Username:</span> {student.username}
                    </p>
                    <p>
                      <span className="font-semibold">University:</span> {student.university}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {student.email}
                    </p>
                    <p>
                      <span className="font-semibold">Total Course:</span> {student.enrollments.length}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default page;
