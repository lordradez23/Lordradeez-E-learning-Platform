declare interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
}

declare interface ICategory {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface IwhatYouWillLearn {
  title: string;
  description: string;
  list: string[];
}

declare interface ICourseDetails {
  detailDescription: string;
  instructor: IInstructorInfo;
  whatYouWillLearn: IwhatYouWillLearn[];
  courseRating: {
    average: number;
    totalReviews: number;
    breakdown: { stars: number; count: number }[];
  };
}

interface ILesson {
  title: string;
  duration: string;
}

declare interface Ilessons {
  topic: ILesson;
  lesson: ILesson[];
}

declare interface ICourse {
  id: number;
  image: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  duration: string;
  lectures: number;
  instructor: string;
  instructorSlug: string;
  translation: string;
  price: string;
  ratingCount: string;
  ratingTotal: string;
  badgeBg: string;
}

declare interface IReview {
  id: number;
  name: string;
  avatar: string;
  university: string;
  rating: string;
  review: string;
}

declare interface INews {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  reads: string;
  publishDate: string;
  badgeBg: string;
}

declare interface IAchievements {
  courses: number;
  mentor: number;
  courseEnroll: number;
  activeUsers: number;
}

declare interface IInstructorInfo {
  name: string;
  avatar: string;
  slug: string;
  headline: string;
  summary: string;
  bio: string;
  totalStudents: string;
  totalReviews: string;
  totalCourses: ICourse[];
  social: {
    website: ISocial;
    facebook: ISocial;
    twitter: ISocial;
    linkedin: ISocial;
    youtube: ISocial;
  };
}
interface ISocial {
  url: string;
  icon: React.ReactNode;
}

declare interface IUser {
  name: string;
  email: string;
  avatar: string;
  allCourses: IProgressCourse[];
}

declare interface IProgressCourse {
  id: number;
  image: string;
  title: string;
  slug: string;
  category: string;
  allLessons: number;
  finishedLessons: number;
}

interface IFormInput {
  placeholder: string;
  type: string;
  label: string;
}

declare interface IContactInputs extends IFormInput {
  name: "from_email" | "subject" | "message";
}

declare interface ILoginInputs extends IFormInput {
  name: "email" | "password";
}

declare interface IRegisterInputs extends IFormInput {
  name: "fullname" | "username" | "email" | "password" | "confirmPassword";
}

declare interface IBillingInputs extends IFormInput {
  name: "firstName" | "lastName" | "email" | "address" | "country" | "city" | "state" | "zipCode";
}

declare interface IPaymentInputs extends IFormInput {
  name: "cardNumber" | "expiryDate" | "cvv" | "cardName";
}

declare interface IProfileSettingsInputs extends IFormInput {
  name: "username" | "fullname";
}

declare interface IChangeAccountInputs extends IFormInput {
  name: "email" | "currentPassword" | "newPassword" | "confirmNewPassword";
}

declare interface ISocialSettingsInputs extends IFormInput {
  name: "website" | "facebook" | "github" | "linkedin";
}

declare interface JwtPayload {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "INSTRUCTOR";
  avatar: string | null;
  iat?: number;
  exp?: number;
}

declare interface SettingsSidebarItems {
  title: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

declare interface INavItems{
  name: string;
  href: string;
}

declare interface ICartItem {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  ratingCount: number;
  ratingTotal: number;
  duration: string;
  lectures: number;
  price: number;
}

declare interface Transaction {
  id: string;
  course: string;
  category: string;
  user: string;
  date: string;
  price: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
  showActions?: boolean;
}
