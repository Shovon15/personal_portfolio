"use client";
import { Button } from "@/components/ui/button";
import { DashboardWrapper } from "../_components/dashboardWrapper";
import Link from "next/link";
// import { useLogoutMutation } from "@/redux/feature/auth/authApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authProvider";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { JSX, useRef, useState } from "react";
import { LucideUploadCloud, Trash2 } from "lucide-react";
import { get, post } from "@/utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { AvatarUpdateForm } from "../_components/userUpdateForm/avatarUpdate";
import { UserModal } from "@/components/customModel/userModal";

const DashboardPage = () => {
	const { fetchData, logout, user, isLoading } = useAuth();
// console.log(user,"user")
	//modal state
	const [authModalOpen, setAuthModalOpen] = useState(false);
	const [formComponent, setFormComponent] = useState<React.ReactNode | null>(null);

	const router = useRouter();

	// const {
	// 	data: userInfo = {},
	// 	refetch,
	// 	isLoading,
	// } = useQuery({
	// 	queryKey: ["userInfo"],
	// 	queryFn: async () => {
	// 		const res = await get("/user-info");
	// 		const data = res.data.payload?.user;

	// 		return data;
	// 	},
	// });


	const handleLogout = async () => {
		await logout();
		router.push("/");
	};

	if (isLoading) {
		return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
	}

	return (
		<DashboardWrapper>
			{user && (
				<>
					<div>
						<p className="font-bold text-xl p-3">{user.name}</p>
						{user.avatar?.url && (
							<Image
								src={user.avatar.url}
								alt="user-avatar"
								width={200}
								height={200}
								className="rounded-full "
							/>
						)}
					</div>
				</>
			)}

			<div className="p-5">
				<UserModal
					button={<Button>update avatar</Button>}
					modalOpen={authModalOpen}
					setModalOpen={setAuthModalOpen}
					handleOpen={() => setAuthModalOpen(true)}
					formComponent={<AvatarUpdateForm refetch={fetchData} setModalOpen={setAuthModalOpen} />}
				/>
			</div>
			<div className="space-y-5">
				<div className="flex flex-col md:flex-row gap-5">
					<Button asChild>
						<Link href="/">update Profile</Link>
					</Button>
					<Button asChild>
						<Link href="/">update Password</Link>
					</Button>
				</div>
				<Button onClick={handleLogout} variant="destructive">
					Logout
				</Button>
			</div>
		</DashboardWrapper>
	);
};
export default DashboardPage;
