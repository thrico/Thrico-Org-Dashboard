import { ImageResponse } from "next/og";
import { getOrganization } from "../graphql/actions";

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
  console.log(params);
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <img src={"./favicon/apple-icon.png"} />
    )
  );
}
