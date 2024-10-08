"use client"
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import Link from "next/link";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import Image from "next/image";
import { useGetMe } from "@/hooks/useGetMe";

const RightPanel = () => {
	const { data: authUser, isLoading } = useGetMe();

	console.log("authUser", authUser);

	if (isLoading) {
		return (
			<div className='hidden lg:block my-4 mx-2'>
				<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
					<p className='font-bold'>Who to follow</p>
					<div className='flex flex-col gap-4'>
						<RightPanelSkeleton />
						<RightPanelSkeleton />
						<RightPanelSkeleton />
						<RightPanelSkeleton />
					</div>
				</div>
			</div>
		);
	}

	if (!authUser) {
		return null;
	}

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{USERS_FOR_RIGHT_PANEL && USERS_FOR_RIGHT_PANEL.length > 0 ? 
					(USERS_FOR_RIGHT_PANEL?.map((user) => (
						<Link
							href={`/profile/${user.username}`}
							className='flex items-center justify-between gap-4'
							key={user._id}
						>
							<div className='flex gap-2 items-center'>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<Image
											width={32}
											height={32}
											alt="profileimg"
											src={user.profileImg || "/avatar-placeholder.png"}
										/>
									</div>
								</div>
								<div className='flex flex-col'>
									<span className='font-semibold tracking-tight truncate w-28'>
										{user.fullName}
									</span>
									<span className='text-sm text-slate-500'>@{user.username}</span>
								</div>
							</div>
							<div>
								<button
									className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
									onClick={(e) => e.preventDefault()}
								>
									Follow
								</button>
							</div>
						</Link>
					))) : (
						
						<p className='text-center text-slate-500'>No suggestions available.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default RightPanel;
