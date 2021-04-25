import { graphql } from "gatsby";
import React, { Fragment, useRef } from "react";
import { useConfiguration, useSections } from "../hooks";
import { Navigation, Section } from "../components";

interface Query {
	site: {
		siteMetadata: {
			title: string;
			description: string;
		};
	};
}

const Home: React.FC<{ data: Query }> = () => {
	const sections = useSections();
	const { noticeSheet } = useConfiguration();
	const navRef = useRef<HTMLElement>(null);
	const sectionRefs = useRef<{ id: string; elRef: HTMLElement | null }[]>([]);

	const executeScroll = (sectionId: string): void => {
		const sectionRef = sectionRefs.current.find((x) => x.id === sectionId);
		if (sectionRef?.elRef && navRef.current) {
			window.scrollTo({
				behavior: "smooth",
				left: 0,
				top: sectionRef.elRef.offsetTop - navRef.current.offsetHeight,
			});
		}
	};

	return (
		<>
			<Navigation navRef={navRef} onNavigate={executeScroll} />
			<div
				ref={(r) => sectionRefs.current.push({ id: "home", elRef: r })}
				className="h-screen bg-no-repeat bg-cover grid grid-cols-3"
				style={{
					backgroundImage:
						"linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/assets/front_church_header.jpg)",
				}}
			>
				<div className="col-span-1 flex flex-col justify-center items-center">
					<div className="bg-gray-50 p-4 rounded-lg flex justify-center items-center">
						<img src="/assets/FinalLogo.png" alt="Church logo" />
					</div>
					<div className="bg-gray-50 p-4 mt-5 rounded-lg flex justify-center items-center">
						<a className="" href={noticeSheet.file}>
							{noticeSheet.text}
						</a>
					</div>
				</div>
				<div className="col-span-2"></div>
			</div>
			{sections.map((section) => (
				<Fragment key={section.id}>
					<Section section={section} sectionRefs={sectionRefs} />
					{section.image && (
						<div
							className="h-64 bg-no-repeat bg-cover bg-fixed"
							style={{
								backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${section.image})`,
							}}
						></div>
					)}
				</Fragment>
			))}
		</>
	);
};

export default Home;

export const query = graphql`
	query {
		site {
			siteMetadata {
				title
				description
			}
		}
	}
`;
