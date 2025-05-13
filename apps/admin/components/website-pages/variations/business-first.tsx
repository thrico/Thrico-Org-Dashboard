import { Typography, Button } from "antd";
import HeroStatic from "../sections/hero-static";
import JobsListing from "../sections/jobs-listing";
import NewsRoom from "../sections/news-room";
import EventsList from "../sections/events-list";
import GroupsGrid from "../sections/groups-grid";
import Gallery from "../sections/gallery";
import Testimonials from "../sections/testimonials";
import MembersCarousel from "../sections/members-carousel";

const { Title } = Typography;

export default function BusinessFirst() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "64px",
        padding: "32px 0",
      }}
    >
      <HeroStatic
        title="Connect, Grow, Succeed"
        subtitle="Join our professional network to find opportunities and build your career"
        ctaText="Browse Jobs"
        ctaLink="/jobs"
      />

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
            Featured Jobs
          </Title>
          <Button type="primary">Post a Job</Button>
        </div>
        <JobsListing featured={true} />
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
              News & Insights
            </Title>
            <Button type="default">View All</Button>
          </div>
          <NewsRoom twoColumn={true} />
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
            <Button type="primary">This Week</Button>
            <Button type="text" style={{ marginLeft: 8 }}>
              This Month
            </Button>
            <Button type="text" style={{ marginLeft: 8 }}>
              All
            </Button>
          </div>
        </div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Professional Groups
          </Title>
          <Button type="default">Browse All</Button>
        </div>
        <GroupsGrid professional={true} />
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
        <Gallery minimal={true} />
      </section>

      <section style={{ background: "#f5f5f5", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 32 }}>
            Success Stories
          </Title>
          <Testimonials professional={true} />
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
            Featured Professionals
          </Title>
          <Button type="default">View All Members</Button>
        </div>
        <MembersCarousel professional={true} />
      </section>
    </div>
  );
}
