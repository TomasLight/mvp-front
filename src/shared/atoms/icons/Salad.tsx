import React from "react";

import { SvgIconProps } from "@material-ui/core/SvgIcon";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { withStyles } from "@material-ui/core";

type Props = SvgIconProps;

const Salad = (props: Props) => (
    <SvgIcon {...props} width="20px" height="20px" fill="none" viewBox="0 0 20 20">
        <path
            d="M14.9194 1.00327C14.3914 1.02994 13.8681 1.19943 13.4014 1.49505C12.9346 1.79067 12.5403 2.2022 12.2575 2.68909C11.9478 3.22411 11.7849 3.82838 11.7879 4.43061C11.7909 5.03283 11.9598 5.60787 12.2746 6.08786C12.8494 6.11899 13.4339 5.97697 13.9591 5.67853C14.4843 5.38008 14.9284 4.93768 15.239 4.40346C15.5486 3.86844 15.7116 3.26417 15.7086 2.66195C15.7055 2.05972 15.5366 1.48468 15.2218 1.00469C15.1215 0.998954 15.0206 0.998478 14.9194 1.00327ZM14.4158 1.78837C14.4192 1.78832 14.4225 1.78832 14.4258 1.78837C14.49 1.78884 14.553 1.80629 14.6083 1.83894C14.6636 1.87159 14.7093 1.9183 14.7409 1.97433C14.7724 2.03037 14.7887 2.09377 14.7879 2.15811C14.7872 2.22245 14.7696 2.28547 14.7368 2.34079L14.4401 2.86038L14.7468 2.799C14.7558 2.79724 14.7648 2.79581 14.7739 2.79472C14.8669 2.78466 14.9601 2.81066 15.0345 2.86738C15.1089 2.92411 15.1589 3.00725 15.174 3.09972C15.1892 3.19219 15.1684 3.28696 15.116 3.36458C15.0636 3.44219 14.9836 3.49674 14.8923 3.51701L13.9594 3.70401L13.3146 4.84026C13.2909 4.88216 13.2593 4.91898 13.2214 4.94862C13.1836 4.97826 13.1403 5.00013 13.094 5.01299C13.0477 5.02585 12.9994 5.02944 12.9517 5.02356C12.904 5.01768 12.858 5.00245 12.8162 4.97872C12.7744 4.955 12.7377 4.92326 12.7082 4.88531C12.6786 4.84737 12.6568 4.80395 12.644 4.75756C12.6312 4.71116 12.6276 4.66269 12.6335 4.61491C12.6394 4.56714 12.6546 4.52099 12.6783 4.47912L13.3802 3.24722C13.3811 3.24531 13.3821 3.2434 13.383 3.24151C13.3955 3.20982 13.4123 3.18004 13.433 3.15301L13.4344 3.15158L14.1006 1.97964C14.1285 1.92776 14.1685 1.88339 14.2172 1.85034C14.2658 1.81728 14.3218 1.79651 14.3802 1.78979C14.392 1.78873 14.4039 1.78825 14.4158 1.78836L14.4158 1.78837ZM8.092 2.48925C7.48671 2.45754 6.88332 2.57199 6.3659 2.73477C5.72184 2.9374 5.34987 3.39233 5.04207 3.73399C4.73427 4.07564 4.48284 4.31668 4.30455 4.38776C3.11688 4.86123 2.58587 6.05161 2.25747 7.02712C2.19394 7.21583 2.14669 7.39393 2.09912 7.56955H4.99357C5.0159 7.5394 5.04298 7.51296 5.07345 7.49104C6.22249 6.61353 6.84025 5.69225 7.50285 4.58189C7.56048 4.47506 7.66759 4.40401 7.78815 4.39204C7.80248 4.39073 7.8167 4.39025 7.83095 4.39062C8.11341 4.39669 8.28239 4.70813 8.13337 4.94875C8.0081 5.1633 7.89987 5.33256 7.78672 5.51688L8.60128 5.73528C9.07247 5.86477 8.87988 6.57423 8.40869 6.44472L7.36304 6.16351C7.00466 6.67853 6.63693 7.10709 6.1191 7.56956H12.2817C12.2461 7.51483 12.21 7.46024 12.1733 7.40968C11.9702 7.13007 11.739 6.89046 11.5314 6.66027C11.1161 6.19989 10.8841 5.80132 10.8909 5.65534C10.9474 4.44043 10.4345 3.60339 9.83523 3.12304C9.30546 2.69837 8.6973 2.52095 8.092 2.48925ZM17.0949 3.91242C16.8689 3.90468 16.6514 4.002 16.5071 4.1765L13.6855 7.56955H18.7625C18.9627 6.49639 18.7167 5.36173 17.9893 4.51195C17.9874 4.51003 17.9855 4.50817 17.9836 4.50624C17.838 4.33906 17.6767 4.18878 17.5 4.05802C17.3828 3.96982 17.2413 3.91913 17.0949 3.91242ZM1.74677 8.30184C1.65034 8.30117 1.55473 8.31968 1.46547 8.35628C1.37621 8.39288 1.29508 8.44686 1.22676 8.51509C1.15845 8.58332 1.1043 8.66444 1.06746 8.75378C1.03061 8.84311 1.0118 8.93888 1.0121 9.03555C1.01707 12.822 3.27067 16.2468 6.73822 17.7487C6.8302 17.788 6.92926 17.8079 7.02924 17.8073H13.9865C14.0864 17.8079 14.1855 17.788 14.2775 17.7487C17.7378 16.2412 19.9862 12.8176 19.9879 9.03555C19.9882 8.939 19.9694 8.84335 19.9327 8.75411C19.8959 8.66487 19.8419 8.58381 19.7737 8.5156C19.7056 8.44739 19.6246 8.39338 19.5355 8.3567C19.4464 8.32001 19.351 8.30136 19.2547 8.30184H1.74677ZM17.6484 11.9547C17.7124 11.9497 17.7765 11.9617 17.8344 11.9896C17.8923 12.0174 17.9418 12.06 17.9779 12.1132C18.0141 12.1663 18.0357 12.2281 18.0404 12.2922C18.0452 12.3564 18.033 12.4207 18.005 12.4786C17.8202 12.8745 17.6089 13.2544 17.3702 13.6191C17.2509 13.8014 17.1243 13.9795 16.9922 14.153C16.9654 14.1965 16.9298 14.2339 16.8877 14.2627C16.8456 14.2916 16.7979 14.3113 16.7478 14.3205C16.6976 14.3298 16.6461 14.3284 16.5965 14.3164C16.5469 14.3045 16.5004 14.2823 16.4599 14.2512C16.4194 14.2201 16.3859 14.1809 16.3614 14.136C16.337 14.0911 16.3223 14.0416 16.3181 13.9906C16.314 13.9397 16.3205 13.8884 16.3374 13.8402C16.3542 13.7919 16.3809 13.7477 16.4158 13.7105C16.5374 13.5509 16.6512 13.3872 16.7611 13.2194C16.9807 12.8839 17.1788 12.5303 17.3488 12.166C17.3757 12.1074 17.4176 12.057 17.4702 12.0199C17.5228 11.9828 17.5843 11.9603 17.6484 11.9547ZM15.1591 15.1336C15.2357 15.1325 15.3107 15.1556 15.3735 15.1996C15.4363 15.2435 15.4836 15.3062 15.5089 15.3787C15.5341 15.4512 15.536 15.5299 15.5142 15.6035C15.4923 15.6771 15.448 15.7419 15.3873 15.7888C15.3008 15.8571 15.2126 15.9234 15.1234 15.9887C15.0852 16.0211 15.0408 16.0453 14.9929 16.0598C14.945 16.0743 14.8946 16.0787 14.8449 16.0729C14.7952 16.067 14.7472 16.0509 14.704 16.0257C14.6607 16.0004 14.6231 15.9665 14.5935 15.9261C14.5639 15.8857 14.5429 15.8396 14.5318 15.7906C14.5207 15.7417 14.5198 15.691 14.5291 15.6417C14.5384 15.5925 14.5577 15.5456 14.5858 15.5041C14.6139 15.4626 14.6503 15.4274 14.6926 15.4006C14.7746 15.3405 14.8569 15.2792 14.9365 15.2164C14.99 15.1726 15.0548 15.1449 15.1234 15.1365C15.1352 15.135 15.1471 15.134 15.1591 15.1336L15.1591 15.1336ZM1.74677 18.5381C1.64949 18.5359 1.55276 18.5533 1.46226 18.589C1.37175 18.6248 1.2893 18.6783 1.21974 18.7463C1.15018 18.8144 1.09491 18.8957 1.05717 18.9855C1.01944 19.0752 1 19.1716 1 19.269C1 19.3663 1.01944 19.4627 1.05717 19.5525C1.09491 19.6422 1.15018 19.7235 1.21974 19.7916C1.2893 19.8597 1.37175 19.9132 1.46226 19.9489C1.55276 19.9847 1.64949 20.002 1.74677 19.9998H19.2532C19.3505 20.002 19.4472 19.9847 19.5377 19.9489C19.6282 19.9132 19.7107 19.8597 19.7803 19.7916C19.8498 19.7235 19.9051 19.6422 19.9428 19.5525C19.9806 19.4627 20 19.3663 20 19.269C20 19.1716 19.9806 19.0752 19.9428 18.9855C19.9051 18.8957 19.8498 18.8144 19.7803 18.7463C19.7107 18.6783 19.6282 18.6248 19.5377 18.589C19.4472 18.5533 19.3505 18.5359 19.2532 18.5381H1.74677Z"
        />
    </SvgIcon>
);

const componentWithStyles = withStyles({
    root: {
        width: "auto",
    },
})(Salad);
export { componentWithStyles as Salad };
