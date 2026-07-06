import { getCoursesAction } from "@/actions/courseActions";
import { Courses } from "@/components";
import { Container, Heading } from "@/components/index";
import CartItems from "./CartItems";

const page = async () => {
  const allCourses = await getCoursesAction();
  return (
    <>
      <CartItems />
      <Container background="bg-white dark:bg-slate-800">
        <Courses courses={allCourses.slice(0, 4)} heading={<Heading title="You might also like" />} swiper={false} />
      </Container>
    </>
  );
};

export default page;
