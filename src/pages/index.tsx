import { type NextPage } from "next";
import Head from "next/head";

import { api } from "@/utils/api";
import { type FormEvent, useState } from "react";
import Link from "next/link";

const Home: NextPage = () => {
	const { data: wishesData, refetch: refetchWishes } =
		api.wishes.getAll.useQuery(undefined, {
			refetchOnWindowFocus: false,
			onSuccess: (res) => {
				setWishes(res);
			},
		});

	const [wishes, setWishes] = useState<typeof wishesData>([]);

	const addWishMutation = api.wishes.addWish.useMutation();
	const reserveWishMutation = api.wishes.reserveWish.useMutation();

	const [wishName, setWishName] = useState("");
	const [wishLink, setWishLink] = useState("");

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		addWishMutation
			.mutateAsync({ wishName: wishName, linkToProduct: wishLink })
			.then(() => {
				refetchWishes();
			});
	};

	return (
		<>
			<Head>
				<title>Wishlist</title>
				<meta
					name="description"
					content="my personal wishlist"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<main className="flex min-h-screen flex-col items-center bg-zinc-900">
				<div className="container flex flex-col items-center gap-12 px-4 py-16">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						Wishlist
					</h1>
					<form
						className="flex w-full max-w-lg items-center gap-4"
						onSubmit={handleSubmit}
					>
						<div className="flex grow flex-col gap-4">
							<div className="flex flex-col">
								<label
									className="mb-1 text-white"
									htmlFor="wishNameInput"
								>
									wish name
								</label>
								<input
									className="rounded-md px-2 py-1"
									type="text"
									id="wishNameInput"
									value={wishName}
									onChange={(ev) => {
										setWishName(ev.currentTarget.value);
									}}
									placeholder="my new wish"
								/>
							</div>
							<div className="flex flex-col">
								<label
									className="mb-1 text-white"
									htmlFor="wishLinkInput"
								>
									link to product{" "}
									<span className="text-white/70">
										(optional)
									</span>
								</label>
								<input
									className="rounded-md px-2 py-1"
									type="text"
									id="wishLinkInput"
									value={wishLink}
									onChange={(ev) => {
										setWishLink(ev.currentTarget.value);
									}}
									placeholder="https://www.amazon.com"
								/>
							</div>
						</div>
						<button
							className="rounded-md bg-white px-4 py-2 font-medium"
							type="submit"
						>
							add wish
						</button>
					</form>
					<div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-4 md:gap-8">
						{wishes &&
							wishes.map((wish) => {
								return (
									<div
										className="flex flex-col gap-2 rounded-md bg-white p-4"
										key={wish.id}
									>
										<div className="flex justify-between px-4 py-2">
											<div>{wish.name}</div>
											<div>
												{wish.reserved
													? "reserved"
													: "not reserved"}
											</div>
										</div>
										<div className="flex justify-between">
											<button
												className="btn-ghost"
												onClick={() => {
													reserveWishMutation
														.mutateAsync({
															wishId: wish.id,
															wishIsReserved:
																!wish.reserved,
														})
														.then(() => {
															refetchWishes();
														});
												}}
											>
												{wish.reserved
													? "unreserve this wish"
													: "reserve this wish"}
											</button>
											{wish.linkToProduct && (
												<Link
													className="btn-ghost"
													href={wish.linkToProduct}
													target={"_blank"}
												>
													buy it here!
												</Link>
											)}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
