"use client";

import { Review } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewForm from "./review-form";
import { getReviews } from "@/lib/actions/review.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await getReviews({ productId });
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
    };
    loadReviews();
  }, [productId]);

  const reload = () => {
    console.log("review submitted");
  };

  return (
    <div className="space-y-4">
      {reviews.length === 0 && <div>No reviews yet.</div>}

      {userId ? (
        <ReviewForm
          userId={userId}
          productId={productId}
          onReviewSubmitted={reload}
        />
      ) : (
        <div>
          Please
          <Link
            className="text-blue-700 px-2"
            href={`/sign-in?callbackUrl=/product/${productSlug}`}
          >
            to write a review
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {/* reviews */}
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div>
                <CardTitle>{review.title}</CardTitle>
              </div>
              <CardDescription>{review.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="mr-1 h-3 w-3" />
                {review.user ? review.user.name : "User"}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDateTime(review.createdAt).dateTime}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
