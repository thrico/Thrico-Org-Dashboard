import BalancedLayout from "../website-pages/variations/balanced-layout";
import BusinessFirst from "../website-pages/variations/business-first";
import CommunityFocused from "../website-pages/variations/community-focused";
import CookieConsent from "../website-pages/variations/cookie-consent";
import Footer from "../website-pages/variations/footer";
import Navbar from "../website-pages/variations/navbar";

const renderPreview = (selectedVariation: any) => {
  switch (selectedVariation) {
    case "community":
      return (
        <>
          <CommunityFocused />
        </>
      );
    case "business":
      return <BusinessFirst />;
    default:
      return <BalancedLayout />;
  }
};

export default renderPreview;
