import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {LicenseManager} from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
LicenseManager.setLicenseKey("Using_this_{AG_Grid}_Enterprise_key_{AG-048741}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{MET_CHEM_ZAKLADY_METALOWO_CHEMICZNE_SWIERCZEK_HALINA}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{MCP}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{MCP}_need_to_be_licensed___{MCP}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{11_December_2024}____[v3]_[01]_MTczMzg3NTIwMDAwMA==76b4e069fc643204bef66ab02425ff76");

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
