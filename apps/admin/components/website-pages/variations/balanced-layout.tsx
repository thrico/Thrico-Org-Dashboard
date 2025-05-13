import { Typography } from "antd";
import HeroCarousel from "../sections/hero-carousel";
import EventsList from "../sections/events-list";
import GroupsGrid from "../sections/groups-grid";
import MembersCarousel from "../sections/members-carousel";
import Testimonials from "../sections/testimonials";
import Gallery from "../sections/gallery";
import NewsRoom from "../sections/news-room";
import JobsListing from "../sections/jobs-listing";

const { Title } = Typography;

export default function BalancedLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "64px",
        padding: "32px 0",
      }}
    >
      <HeroCarousel />

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
          Upcoming Events
        </Title>
        <EventsList />
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
          Popular Groups
        </Title>
        <GroupsGrid />
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
          Latest Members
        </Title>
        <MembersCarousel />
      </section>

      <section style={{ background: "#f5f5f5", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
            What Our Members Say
          </Title>
          <Testimonials />
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
          Gallery
        </Title>
        <Gallery />
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
          News Room
        </Title>
        <NewsRoom />
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
          Job Opportunities
        </Title>
        <JobsListing />
      </section>
    </div>
  );
}
