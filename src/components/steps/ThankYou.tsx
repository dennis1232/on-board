import Image from "next/image";

export default function ThankYou() {
  return (
    <div className="max-w-lg mx-auto text-center py-16">
      <div className="mb-6">
        <Image
          src="/assets/images/icon-thank-you.svg"
          alt="Thank you"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>
      <h1 className="text-3xl font-bold text-marine-blue mb-4">Thank you!</h1>
      <p className="text-cool-gray">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}
