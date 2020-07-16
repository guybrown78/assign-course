import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	navigationData = [
		
		{
			routerLink:"/",
			label:"Dashboard",
			hasSub:false,
			subItems:null
		},
		{
			routerLink:"/",
			label:"Users",
			hasSub:false,
			subItems:null
		},
		{
			routerLink:"/",
			label:"Categories",
			hasSub:false,
			subItems:null
		},
		{
			routerLink:"/",
			label:"Courses",
			hasSub:false,
			subItems:null
		},
		{
			routerLink:"/",
			label:"Reports",
			hasSub:false,
			subItems:null
		},
		{
			routerLink:"/",
			label:"Settings",
			hasSub:false,
			subItems:null
		}
	
	]



  constructor() { }

  ngOnInit() {
  }

	// Listen to all tfRouterLinkClicked events that are emited from the parent tf-side-drawer-nav. Each tf-side-drawer-nav-link and tf-side-drawer-nav-link can emit this event if "router-link" prop is set. The Event Bubbles up and can be collected in one handler
	onRouterNavClicked(event){
		// 
	}

	// Listen to only a single tfRouterLinkClicked event that is emited from a tf-side-drawer-nav-link or tf-side-drawer-nav-link. If an event handler is used for like this, the event won't be bubbled up
	onRouterNavLinkedClicked(event){
		console.log("tfRouterLinkClicked handled on a link rather than the parent nav");
	}
}
