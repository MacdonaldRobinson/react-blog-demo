import { AuthButton, EditableContent } from "flex-cms";
import { CMSPageWrapper } from "./CMSPage.styles";

const CMSPage = () => {
    return (
        <CMSPageWrapper>
            <AuthButton />
            <div>
                <EditableContent contentId="CMS Content">
                    This is some inital content
                </EditableContent>
            </div>
        </CMSPageWrapper>
    );
};

export default CMSPage;
