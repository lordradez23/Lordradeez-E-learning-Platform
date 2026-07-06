import { User, Settings, Share2, LayoutDashboard, Users, CreditCard } from "lucide-react";

export const navItems: INavItems[] = [
  {
    name: "Home",
    href: "/home",
  },
  {
    name: "Category",
    href: "/courses-category",
  },
  {
    name: "Courses",
    href: "/all-courses",
  },
  {
    name: "Tech with us",
    href: "/instructors",
  },
];

export const ContactFormInputs: IContactInputs[] = [
  {
    name: "from_email",
    placeholder: "Email",
    label: "Email",
    type: "email",
  },
  {
    name: "subject",
    placeholder: "Subject",
    label: "Subject",
    type: "text",
  },
  {
    name: "message",
    placeholder: "Message",
    label: "Message",
    type: "text",
  },
];

export const LoginFormInputs: ILoginInputs[] = [
  {
    name: "email",
    placeholder: "Enter your email",
    label: "Email",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Enter your password",
    label: "Password",
    type: "password",
  },
];

export const RegisterFormInputs: IRegisterInputs[] = [
  {
    name: "fullname",
    placeholder: "Enter your Full Name",
    label: "Full Name",
    type: "text",
  },
  {
    name: "username",
    placeholder: "Enter your Username",
    label: "Username",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Enter your Email",
    label: "Email",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Enter your Password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm your Password",
    label: "Confirm Password",
    type: "password",
  },
];

export const BillingFormInputs: IBillingInputs[] = [
  {
    name: "firstName",
    placeholder: "John",
    label: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    placeholder: "Doe",
    label: "Last Name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "john.doe@example.com",
    label: "Email",
    type: "text",
  },
  {
    name: "address",
    placeholder: "123 Main Street",
    label: "Address",
    type: "text",
  },
  {
    name: "country",
    placeholder: "Egypt",
    label: "Country",
    type: "text",
  },
  {
    name: "city",
    placeholder: "Cairo",
    label: "City",
    type: "text",
  },
  {
    name: "state",
    placeholder: "State",
    label: "State",
    type: "text",
  },
  {
    name: "zipCode",
    placeholder: "ZipCode",
    label: "ZipCode",
    type: "text",
  },
];

export const SettingsSidebarItems: SettingsSidebarItems[] = [
  {
    title: "Profile",
    href: "/account/settings",
    icon: User,
  },
  {
    title: "Account",
    href: "/account/settings/change-account",
    icon: Settings,
  },
  {
    title: "Social Media",
    href: "/account/settings/social",
    icon: Share2,
  },
];

export const ProfileSettingsFormInputs: IProfileSettingsInputs[] = [
  {
    name: "username",
    placeholder: "Change your username",
    label: "Username",
    type: "text",
  },
  {
    name: "fullname",
    placeholder: "Change your full name",
    label: "Full Name",
    type: "text",
  },
];

export const ChangeAccountFormInputs: IChangeAccountInputs[] = [
  {
    name: "email",
    placeholder: "Change your email",
    label: "Email",
    type: "email",
  },
  {
    name: "currentPassword",
    placeholder: "Enter your current password",
    label: "Current Password",
    type: "password",
  },
  {
    name: "newPassword",
    placeholder: "Enter your new password",
    label: "New Password",
    type: "password",
  },
  {
    name: "confirmNewPassword",
    placeholder: "Confirm your new password",
    label: "Confirm New Password",
    type: "password",
  },
];

export const SocialSettingsFormInputs: ISocialSettingsInputs[] = [
  {
    name: "website",
    placeholder: "Change your website",
    label: "Website",
    type: "text",
  },
  {
    name: "facebook",
    placeholder: "Change your facebook",
    label: "Facebook",
    type: "text",
  },
  {
    name: "github",
    placeholder: "Change your github",
    label: "Github",
    type: "text",
  },
  {
    name: "linkedin",
    placeholder: "Change your linkedin",
    label: "Linkedin",
    type: "text",
  },
];

export const categoryBadgeColors = {
  Business: "bg-indigo-600",
  Design: "bg-rose-500",
  Programming: "bg-emerald-600",
  Health: "bg-cyan-500",
  Technology: "bg-blue-500",
  Development: "bg-fuchsia-600",
  Marketing: "bg-orange-500",
  Music: "bg-pink-600",
};

export const VAT_RATE: number = 0.05;

// Admin Dashboard
export const menuItems = [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin" }];

export const courseSubItems = [
  { id: "all-course", label: "All Course", path: "/admin/courses" },
  { id: "add-course", label: "Add Course", path: "/admin/courses/add-course" },
];

export const instructorsSubItems = [{ id: "all-instructors", label: "All Instructors", path: "/admin/instructors" }];

export const studentSubItems = [{ id: "all-student", label: "All Student", path: "/admin/students", icon: Users }];

export const communicationSubItems = [
  { id: "discussion", label: "Discussion", path: "/admin/communication" },
  { id: "review-course", label: "Review Course", path: "/admin/communication/reviews" },
];

export const paymentsSubItems = [
  { id: "all-payment", label: "All Payments", path: "/admin/payment", icon: CreditCard },
  { id: "all-payment/payout", label: "Payout", path: "/admin/payment/payout", icon: CreditCard },
];

// Admin Dashboard dummy data
export const earningChartData = [
  { name: "01 May", value: 400 },
  { name: "4 May", value: 800 },
  { name: "8 May", value: 1000 },
  { name: "12 May", value: 700 },
  { name: "16 May", value: 1200 },
];

export const recentTransactions = [
  {
    id: "1",
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2025",
    price: "$99",
  },
  {
    id: "2",
    course: "How to be Front End Developer",
    category: "Programming",
    user: "John Doe",
    date: "Sun, 02 April 2025",
    price: "$150",
  },
  {
    id: "3",
    course: "User Experience Designer",
    category: "Health",
    user: "George Washington",
    date: "Sat, 20 March 2025",
    price: "$159",
  },
  {
    id: "4",
    course: "How to be UIUX Designer",
    category: "Technology",
    user: "Sarah Smith",
    date: "Thu, 11 July 2025",
    price: "$119",
  },
  {
    id: "5",
    course: "User Experience Designer",
    category: "Business",
    user: "Lordradeez",
    date: "Fri, 26 June 2025",
    price: "$80",
  },
];

export const paymentTransactions = [
  {
    id: "1",
    photo: "/placeholder.svg",
    name: "Angela Saraswati",
    email: "angelaSaraswati@gmail.com",
    amount: "$200",
    status: "Success",
  },
  {
    id: "2",
    photo: "/placeholder.svg",
    name: "Robert Anderson",
    email: "robertanderson@gmail.com",
    amount: "$200",
    status: "Success",
  },
  {
    id: "3",
    photo: "/placeholder.svg",
    name: "Chika Miscela",
    email: "chikamiss@gmail.com",
    amount: "$200",
    status: "Success",
  },
  {
    id: "4",
    photo: "/placeholder.svg",
    name: "Angela Saraswati",
    email: "angelaSaraswati@gmail.com",
    amount: "$200",
    status: "Success",
  },
  {
    id: "5",
    photo: "/placeholder.svg",
    name: "Robert Anderson",
    email: "robertanderson@gmail.com",
    amount: "$200",
    status: "Success",
  },
  {
    id: "6",
    photo: "/placeholder.svg",
    name: "Chika Miscela",
    email: "chikamiss@gmail.com",
    amount: "$200",
    status: "Success",
  },
];

export const searchResults = [
  {
    id: "1",
    photo: "/placeholder.svg",
    name: "Angela Saraswati",
    email: "angelaSaraswati@gmail.com",
  },
  {
    id: "2",
    photo: "/placeholder.svg",
    name: "Robert Anderson",
    email: "robertanderson@gmail.com",
  },
];

export const mentorTransactions = [
  {
    id: "1",
    course: "How to be UIUX Designer ...",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    id: "2",
    course: "How to be Front End Dev ...",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    id: "3",
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    id: "4",
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    id: "5",
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
];

// Instructor Dashboard
export  const instructorMenuItems = [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/instructor-dashboard" }];

export  const instructorCourseSubItems = [
  { id: "all-course", label: "All Course", path: "/instructor-dashboard/courses" },
  { id: "add-course", label: "Add Course", path: "/instructor-dashboard/courses/add-course" },
];

export  const instructorStudentSubItems = [{ id: "all-student", label: "All Student", path: "/instructor-dashboard/students" }];

export  const instructorCommunicationSubItems = [
  { id: "discussion", label: "Discussion", path: "/instructor-dashboard/communication" },
  { id: "review-course", label: "Review Course", path: "/instructor-dashboard/communication/reviews" },
];

// Instructor Dashboard dummy data
export const earningInstChartData = [
  { date: "01 May", value: 200 },
  { date: "04 May", value: 350 },
  { date: "08 May", value: 450 },
  { date: "12 May", value: 750 },
  { date: "16 May", value: 1101 },
  { date: "20 May", value: 800 },
  { date: "24 May", value: 950 },
  { date: "31 May", value: 650 },
];

export const transactions = [
  {
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
  {
    course: "User Experience Designer",
    category: "Design",
    user: "Afif Hanifudin",
    date: "Wed, 26 May 2021",
    price: "$299",
  },
];