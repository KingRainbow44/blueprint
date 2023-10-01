/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate, useParams } from "react-router-dom";

const WithNavigation = (Component: any) => (props: any) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return <Component {...props} {...{
        location, params, navigate
    }} />;
};

export default WithNavigation;
