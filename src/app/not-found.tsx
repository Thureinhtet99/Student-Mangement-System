"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { APP_CONFIG, ROUTE_CONFIG } from "@/configs/appConfig";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16">
            <Image src="/logo.png" alt="logo" fill className="object-contain" />
          </div>
        </div>

        {/* 404 Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-400">404</h1>
          <h2 className="text-xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="text-sm leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for in the{" "}
            <Link
              href={ROUTE_CONFIG.HOME}
              className="font-medium text-secondColor hover:text-firstColor"
            >
              {APP_CONFIG.APP_NAME}
            </Link>
            .
            <br />
            The page might have been moved, deleted, or you entered an incorrect
            URL.
          </p>
        </div>

        {/* Illustration or Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-14 h-14 text-secondColor"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-secondColor hover:bg-firstColor">
            <Link href={ROUTE_CONFIG.HOME}>Go to Dashboard</Link>
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => history.back()}
          >
            <ArrowLeft />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
