import { AuthChecker } from "type-graphql";
import Context from "../types/context";

//if user exists then it returns true or otherwise it returns false
const authChecker: AuthChecker<Context> = ({ context }) => {
    return !!context.user;
};

export default authChecker;