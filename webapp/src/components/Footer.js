import React, { Component } from 'react'
import SimpleReactFooter from "simple-react-footer";


export class Footer extends Component {

	render() {
	const description = "Our website targets the tattoo artists (also possibly nail, hair artists, etc.) and their customers, providing a universal platform for artists to post their work and availability, future schedule, etc."
	const title = "PickInk";
	const columns = [
		{
			title: "Resources",
			resources: [{
				name: "Explore",
				link: "/"
			},{
				name: "About",
				link: "/"
			}]
		},
		{
			title: "Contact",
			resources: [{
				name: "Email",
				link: "/"
			},{
				name: "pickink@gmail.com",
				link: "/"
			}]
		}
	];
	return <SimpleReactFooter 
		description={description} 
		title={title}
		columns={columns}
		copyright="Team 09"
		iconColor="black"
		backgroundColor="rgb(229, 235, 235)"
		fontColor="black"
		copyrightColor="darkgrey"
		/>
	};
}

export default Footer