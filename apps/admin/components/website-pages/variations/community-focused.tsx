import { Typography, Button } from "antd";
import HeroCarousel from "../sections/hero-carousel";
import MembersCarousel from "../sections/members-carousel";
import GroupsGrid from "../sections/groups-grid";
import EventsList from "../sections/events-list";
import Testimonials from "../sections/testimonials";
import NewsRoom from "../sections/news-room";
import JobsListing from "../sections/jobs-listing";
import Gallery from "../sections/gallery";

const { Title } = Typography;

export default function CommunityFocused() {
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Latest Members
          </Title>
          <Button type="default">View All</Button>
        </div>
        <MembersCarousel showLarge={true} />
      </section>

      <section style={{ background: "#f5f5f5", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <Title level={2} style={{ margin: 0 }}>
              Popular Groups
            </Title>
            <Button type="default">Browse All Groups</Button>
          </div>
          <GroupsGrid featured={true} />
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Upcoming Events
          </Title>
          <div>
            <Button type="primary">Upcoming</Button>
            <Button type="text" style={{ marginLeft: 8 }}>
              Past
            </Button>
          </div>
        </div>
        <EventsList />
      </section>

      <section style={{ background: "#f5f5f5", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
            Community Voices
          </Title>
          <Testimonials featured={true} />
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            News & Updates
          </Title>
          <Button type="default">All News</Button>
        </div>
        <NewsRoom showTicker={true} />
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Job Opportunities
          </Title>
          <Button type="primary">Join & Apply</Button>
        </div>
        <JobsListing />
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
          Community Gallery
        </Title>
        <Gallery />
      </section>
    </div>
  );
}
