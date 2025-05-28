"use client";

import { useState } from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Input, Progress, Select, Typography } from "antd";
import { AnswerMapFn, FormSettings, Question } from "./ts-types";
import { TimePicker } from "antd";
import dayjs from "dayjs";
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface MultiStepPreviewProps {
  formTitle: string;
  formDescription?: string;
  questions: any[];
  formSettings: FormSettings;
  onClose: () => void;
}

export function MultiStepPreview({
  formTitle,
  formDescription,
  questions,
  formSettings,
  onClose,
}: MultiStepPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: string]: any;
  }>({});
  const types: { [key: number]: string } = { 1: "Neutral", 2: "sddds" };
  const [isCompleted, setIsCompleted] = useState(false);

  console.log(questions);
  const totalSteps = questions.length; // +1 for welcome screen
  const progress = (currentStep / (totalSteps + 1)) * 100;

  const isCurrentQuestionValid = () => {
    if (currentStep === 0) return true; // Welcome screen
    if (currentStep > questions.length) return true; // Past all questions

    const currentQuestion = questions[currentStep - 1];
    if (!currentQuestion?.required) return true;

    const answer = answers[currentQuestion?.id];
    return answer !== undefined && answer !== null && answer !== "";
  };

  const handleNext = () => {
    if (!isCurrentQuestionValid()) {
      return; // Block navigation if validation fails
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswer: AnswerMapFn = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const renderWelcomeScreen = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${formSettings?.primaryColor} 0%, ${formSettings?.secondaryColor} 100%)`,
        color: "white",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <Title
          level={1}
          style={{
            color: "white",
            fontSize: "3rem",
            marginBottom: 24,
          }}
        >
          {formTitle}
        </Title>
        {formDescription && (
          <Paragraph
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.25rem",
              marginBottom: 48,
            }}
          >
            {formDescription}
          </Paragraph>
        )}
        <Button
          type="primary"
          size="large"
          onClick={handleNext}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "2px solid white",
            color: "white",
            fontSize: "1.1rem",
            height: 48,
            padding: "0 32px",
            borderRadius: formSettings?.borderRadius,
          }}
        >
          Start Survey <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );

  const renderQuestion = (question: Question, index: number) => {
    const questionNumber = index + 1;
    const isLastQuestion = index === questions.length - 1;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "100vh",
          background: formSettings?.backgroundColor,
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: 32 }}>
            <Text type="secondary" style={{ fontSize: 16 }}>
              {questionNumber} of {questions.length}
            </Text>
            <Progress
              percent={(questionNumber / questions.length) * 100}
              showInfo={false}
              strokeColor={formSettings?.primaryColor}
              style={{ marginTop: 8 }}
            />
          </div>

          <div style={{ marginBottom: 48 }}>
            <Title
              level={2}
              style={{
                position: "relative",
                fontSize: "1.5rem",
                marginBottom: 24,
                color:
                  !isCurrentQuestionValid() && currentStep > 0
                    ? "#e74c3c"
                    : formSettings?.primaryColor,
              }}
            >
              {question?.question}
              {question?.required && (
                <span style={{ color: "#e74c3c" }}> *</span>
              )}
              <Button
                type="link"
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: 0,
                  borderRadius: formSettings?.borderRadius,
                }}
              >
                Skip
              </Button>
            </Title>

            {renderQuestionInput(question)}
            {!isCurrentQuestionValid() && currentStep > 0 && (
              <div
                style={{
                  color: "#e74c3c",
                  fontSize: "1rem",
                  marginTop: 16,
                  padding: "12px 16px",
                  background: "#ffeaea",
                  border: "1px solid #ffcdd2",
                  borderRadius: formSettings?.borderRadius,
                }}
              >
                This field is required. Please provide an answer to continue.
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handlePrevious}
              disabled={currentStep === 1}
              size="large"
              style={{
                visibility: currentStep === 1 ? "hidden" : "visible",
                borderRadius: formSettings?.borderRadius,
              }}
            >
              Previous
            </Button>

            <div style={{ display: "flex", gap: 8 }}>
              <Button
                type="primary"
                onClick={handleNext}
                disabled={!isCurrentQuestionValid()}
                size="large"
                style={{
                  background: !isCurrentQuestionValid()
                    ? "#d9d9d9"
                    : formSettings?.primaryColor,
                  borderColor: !isCurrentQuestionValid()
                    ? "#d9d9d9"
                    : formSettings?.primaryColor,
                  fontSize: "1.1rem",

                  padding: "0 32px",
                  cursor: !isCurrentQuestionValid() ? "not-allowed" : "pointer",
                  borderRadius: formSettings?.borderRadius,
                }}
              >
                {isLastQuestion ? "Submit" : "Next"} <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQuestionInput = (question: Question) => {
    const inputStyle = {
      fontSize: `${formSettings?.fontSize}px`,
      fontWeight: formSettings?.fontWeight,
      borderRadius: formSettings?.borderRadius,
      borderWidth: formSettings?.borderWidth,
      borderStyle: formSettings?.borderStyle,
      borderColor: formSettings?.inputBorderColor || formSettings?.borderColor,
      background: formSettings?.inputBackground,
      color: formSettings?.textColor,
      boxShadow: formSettings?.boxShadow,
    };

    const buttonStyle = {
      background: formSettings?.buttonColor || formSettings?.primaryColor,
      borderColor: formSettings?.buttonColor || formSettings?.primaryColor,
      color: "white",
      borderRadius: formSettings?.borderRadius,

      fontWeight: formSettings?.fontWeight,
      boxShadow: formSettings?.boxShadow,
    };

    switch (question?.type) {
      case "SHORT_TEXT":
        return (
          <Input
            maxLength={question?.maxLength || 255}
            showCount
            placeholder="Type your answer here..."
            size="large"
            style={{ ...inputStyle, padding: "16px 20px" }}
            value={answers[Number(question?.id)] || ""}
            onChange={(e) => handleAnswer(question?.id, e.target.value)}
          />
        );

      case "LONG_TEXT":
        return (
          <TextArea
            maxLength={question?.maxLength || 255}
            showCount
            placeholder="Type your answer here..."
            rows={6}
            style={{ ...inputStyle, padding: "16px 20px" }}
            value={answers[question?.id] || ""}
            onChange={(e) => handleAnswer(question?.id, e.target.value)}
          />
        );

      case "EMAIL":
        return (
          <Input
            type="email"
            placeholder="email@example.com"
            size="large"
            style={{ ...inputStyle, padding: "16px 20px" }}
            value={answers[question?.id] || ""}
            onChange={(e) => handleAnswer(question?.id, e.target.value)}
          />
        );

      case "MULTIPLE_CHOICE":

      case "ISOPTION":
        return (
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
            {question?.options?.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswer(question?.id, option)}
                style={{
                  padding: "20px 24px",
                  border: `${formSettings?.borderWidth}px ${formSettings?.borderStyle} ${formSettings?.borderColor}`,
                  borderRadius: formSettings?.borderRadius,
                  cursor: "pointer",
                  background:
                    answers[question?.id] === option
                      ? formSettings?.primaryColor
                      : "white",
                  color: answers[question?.id] === option ? "white" : "#2c3e50",
                  fontSize: `${formSettings?.fontSize}px`,

                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `2px solid ${answers[question?.id] === option ? "white" : formSettings?.primaryColor}`,
                      background:
                        answers[question?.id] === option
                          ? "white"
                          : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {answers[question?.id] === option && (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: formSettings?.primaryColor,
                        }}
                      />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case "RATING":
        return (
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {Array.from({ length: question?.scale || 5 }).map((_, index) => (
              <Button
                key={index}
                shape="circle"
                size="large"
                onClick={() => handleAnswer(question?.id, index + 1)}
                style={{
                  width: 60,
                  height: 60,
                  fontSize: "1.5rem",
                  background:
                    answers[question?.id] === index + 1
                      ? formSettings?.primaryColor
                      : "white",
                  color:
                    answers[question?.id] === index + 1
                      ? "white"
                      : formSettings?.primaryColor,
                  border: `${formSettings?.borderWidth}px ${formSettings?.borderStyle} ${formSettings?.primaryColor}`,
                }}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        );

      case "OPINION_SCALE":
        return (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Text type="secondary">
                {question?.labels?.start || "Not at all likely"}
              </Text>
              <Text type="secondary">
                {question?.labels?.end || "Extremely likely"}
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              {Array.from({
                length: (question?.max || 10) - (question?.min || 1) + 1,
              }).map((_, index) => {
                const value = (question?.min || 1) + index;
                return (
                  <Button
                    key={index}
                    shape="circle"
                    onClick={() => handleAnswer(question?.id, value)}
                    style={{
                      width: 50,
                      height: 50,
                      fontSize: "1.2rem",
                      background:
                        answers[question?.id] === value
                          ? formSettings?.primaryColor
                          : "white",
                      color:
                        answers[question?.id] === value
                          ? "white"
                          : formSettings?.primaryColor,
                      border: `${formSettings?.borderWidth}px ${formSettings?.borderStyle} ${formSettings?.primaryColor}`,
                    }}
                  >
                    {value}
                  </Button>
                );
              })}
            </div>
          </div>
        );

      case "YES-NO":
        return (
          <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
            <Button
              size="large"
              onClick={() => handleAnswer(question?.id, "Yes")}
              style={{
                width: 120,
                height: 60,
                fontSize: "1.2rem",
                background:
                  answers[question?.id] === "Yes" ? "#52c41a" : "white",
                color: answers[question?.id] === "Yes" ? "white" : "#52c41a",
                border: `${formSettings?.borderWidth}px ${formSettings?.borderStyle} #52c41a`,
                borderRadius: formSettings?.borderRadius,
              }}
            >
              Yes
            </Button>
            <Button
              size="large"
              onClick={() => handleAnswer(question?.id, "No")}
              style={{
                width: 120,
                height: 60,
                fontSize: "1.2rem",
                background:
                  answers[question?.id] === "No" ? "#ff4d4f" : "white",
                color: answers[question?.id] === "No" ? "white" : "#ff4d4f",
                border: `${formSettings?.borderWidth}px ${formSettings?.borderStyle} #ff4d4f`,
                borderRadius: formSettings?.borderRadius,
              }}
            >
              No
            </Button>
          </div>
        );

      case "DATE":
        return (
          <DatePicker
            size="large"
            style={{
              width: "100%",
              ...inputStyle,
              padding: "16px 20px",
            }}
            value={answers[question?.id] || ""}
            onChange={(date) => handleAnswer(question?.id, date)}
          />
        );

      case "DROPDOWN":
        return (
          <Select
            placeholder="Select an option"
            size="large"
            style={{
              width: "100%",
              fontSize: `${formSettings?.fontSize}px`,
            }}
            value={answers[question?.id]}
            onChange={(value) => handleAnswer(question?.id, value)}
            options={question?.options?.map((option) => ({
              label: option,
              value: option,
            }))}
          />
        );

      case "TIME":
        return (
          <TimePicker
            style={{
              width: "100%",
              ...inputStyle,
              padding: "16px 20px",
            }}
            value={answers[question?.id] || ""}
            size="large"
            onChange={(time) => handleAnswer(question?.id, time)}
          />
        );

      case "NUMBER":
        return (
          <Input
            placeholder="+1234567890"
            size="large"
            style={{ ...inputStyle, padding: "16px 20px" }}
            value={answers[question?.id] || ""}
            onChange={(e) => handleAnswer(question?.id, e.target.value)}
          />
        );

      case "WEBSITE":
        return (
          <Input
            placeholder="https://example.com"
            type="url"
            size="large"
            style={{ ...inputStyle, padding: "16px 20px" }}
            value={answers[question?.id] || ""}
            onChange={(e) => handleAnswer(question?.id, e.target.value)}
          />
        );
      default:
        return (
          <Input
            placeholder="Type your answer here..."
            size="large"
            style={{ ...inputStyle, padding: "16px 20px" }}
            value={answers[question?.id] || ""}
            onChange={(e) => handleAnswer(question?.id, e.target.value)}
          />
        );
    }
  };

  const renderCompletionScreen = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${formSettings?.primaryColor} 0%, ${formSettings?.secondaryColor} 100%)`,
        color: "white",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
          }}
        >
          <CheckOutlined style={{ fontSize: 40, color: "white" }} />
        </div>
        <Title
          level={1}
          style={{
            color: "white",
            fontSize: "2.5rem",
            marginBottom: 24,
          }}
        >
          Thank you!
        </Title>
        <Paragraph
          style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1.25rem",
            marginBottom: 48,
          }}
        >
          Your response has been recorded. We appreciate your feedback!
        </Paragraph>
        <Button
          size="large"
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "2px solid white",
            color: "white",
            fontSize: "1.1rem",
            height: 48,
            padding: "0 32px",
            borderRadius: formSettings?.borderRadius,
          }}
        >
          Close Preview
        </Button>
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        background: "white",
      }}
    >
      <Button
        icon={<CloseOutlined />}
        onClick={onClose}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 1001,
          background: formSettings?.primaryColor,
          border: "none",
          color: "white",
        }}
      />

      {isCompleted
        ? renderCompletionScreen()
        : currentStep === 0
          ? renderWelcomeScreen()
          : renderQuestion(questions[currentStep - 1], currentStep - 1)}
    </div>
  );
}
