import { ImageResponse } from "next/og";
import { getEntity } from "../graphql/actions";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon({ params }: { params: { slug: string } }) {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <img src={"./favicon/favicon-96x96.png"} />
    )
  );
}
