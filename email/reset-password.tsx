import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { APP_NAME } from "@/lib/constants";

export default function ResetPasswordEmail({
  name,
  resetUrl,
}: {
  name: string;
  resetUrl: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Reset your {APP_NAME} password</Preview>
      <Body className="bg-gray-100 font-sans">
        <Container className="mx-auto py-8 px-4 max-w-xl">
          {/* Header */}
          <Section className="bg-gray-900 rounded-t-lg px-8 py-6 text-center">
            <Heading className="text-yellow-500 text-2xl font-bold m-0">
              {APP_NAME}
            </Heading>
          </Section>

          {/* Body */}
          <Section className="bg-white px-8 py-8">
            <Heading className="text-gray-900 text-xl font-semibold mt-0">
              Hi {name},
            </Heading>
            <Text className="text-gray-500 leading-6">
              We received a request to reset your password. Click the button
              below to choose a new one.
            </Text>
            <Text className="text-gray-500 leading-6">
              This link will expire in <strong>1 hour</strong>.
            </Text>

            {/* Button */}
            <Section className="text-center my-8">
              <Button
                href={resetUrl}
                className="bg-gray-900 text-white px-8 py-3 rounded-md font-bold text-base no-underline"
              >
                Reset Password
              </Button>
            </Section>

            <Text className="text-gray-500 leading-6">
              If you didn&apos;t request this, you can safely ignore this email.
              Your password won&apos;t change.
            </Text>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-gray-400 text-xs">
              If the button doesn&apos;t work, copy and paste this link into
              your browser:{" "}
              <a href={resetUrl} className="text-yellow-500">
                {resetUrl}
              </a>
            </Text>
          </Section>

          {/* Footer */}
          <Section className="bg-gray-100 rounded-b-lg px-8 py-4 text-center">
            <Text className="text-gray-400 text-xs m-0">
              © {new Date().getFullYear()} {APP_NAME} LLC. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
