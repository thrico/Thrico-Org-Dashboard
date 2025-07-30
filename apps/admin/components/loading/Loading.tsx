"use client";

import { Typography, Space } from "antd";

export default function AppLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%)",
      }}
    >
      <Space direction="vertical" size="large" align="center">
        {/* Main Loading Card */}

        {/* Custom SVG Animation */}
        <div style={{ marginBottom: "24px" }}>
          <svg width="400" height="400" viewBox="0 0 120 120">
            {/* Background circle */}

            {/* Animated boxes */}
            <g>
              {/* Box 1 - Ant Design Blue */}
              <rect
                x="45"
                y="45"
                width="12"
                height="12"
                rx="3"
                fill="#0027ff"
                style={{
                  animation: "antdBounce 1.5s ease-in-out infinite",
                  animationDelay: "0ms",
                }}
              />

              {/* Box 2 - Ant Design Purple */}
              <rect
                x="63"
                y="45"
                width="12"
                height="12"
                rx="3"
                fill="#ff5c6d"
                style={{
                  animation: "antdBounce 1.5s ease-in-out infinite",
                  animationDelay: "200ms",
                }}
              />

              {/* Box 3 - Ant Design Green */}
              <rect
                x="45"
                y="63"
                width="12"
                height="12"
                rx="3"
                fill="#ff5c6d"
                style={{
                  animation: "antdBounce 1.5s ease-in-out infinite",
                  animationDelay: "400ms",
                }}
              />

              {/* Box 4 - Ant Design Orange */}
              <rect
                x="63"
                y="63"
                width="12"
                height="12"
                rx="3"
                fill="#0027ff"
                style={{
                  animation: "antdBounce 1.5s ease-in-out infinite",
                  animationDelay: "600ms",
                }}
              />
            </g>

            {/* Rotating ring */}

            {/* Gradient definition */}
            <defs>
              <linearGradient
                id="antdGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0027ff" />
                <stop offset="50%" stopColor="#ff5c6d" />
                <stop offset="100%" stopColor="#0027ff" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </Space>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes antdBounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }

        @keyframes antdRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes antdPulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
