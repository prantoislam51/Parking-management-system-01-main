"use client";

import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Star, MessageSquare, ThumbsUp, MapPin, Plus, Edit3, Trash2, Send } from "lucide-react";
import { useState } from "react";

export function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const reviews = [
    {
      id: 1,
      zone: "Gulshan North Parking",
      date: "May 10, 2024",
      rating: 5,
      text: "Excellent service and very secure area. The RFID entry worked perfectly!",
      helpful: 24,
      replies: 3,
    },
    {
      id: 2,
      zone: "Banani Premium Zone",
      date: "May 5, 2024",
      rating: 4,
      text: "Great location but the ramp is a bit steep for large cars. Staff is very helpful.",
      helpful: 18,
      replies: 2,
    },
  ];

  const handleSubmitReview = () => {
    setShowForm(false);
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My <span className="animated-gradient-text">Reviews</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Share your parking experiences and help the community.
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="h-11 rounded-xl px-6 font-bold shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="bg-slate-800/60 border-slate-700/50 rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-white">Write a Review</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
            </div>

            {/* Rating Selection */}
            <div className="mb-5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">Your Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-8 w-8 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-600 text-slate-600'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
              />
            </div>

            <Button
              onClick={handleSubmitReview}
              className="h-11 rounded-xl font-bold shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Review
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Stats Card */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl overflow-hidden border-none shadow-xl shadow-amber-500/20">
          <CardContent className="p-6 text-center">
            <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2">Average Rating</p>
            <p className="text-5xl font-black text-white tracking-tighter mb-3">4.8</p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`h-5 w-5 ${i <= 4 ? 'fill-white text-white' : 'fill-white/40 text-white/40'}`} />
              ))}
            </div>
            <p className="text-xs text-white/70 font-medium">Based on {reviews.length} reviews</p>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="lg:col-span-3 space-y-5">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-slate-800/40 border-slate-700/50 rounded-2xl overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white">{review.zone}</h3>
                      <p className="text-xs text-gray-500 font-medium">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-600 text-slate-600'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 font-medium leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-amber-400 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      {review.helpful} Helpful
                    </button>
                    <button className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-indigo-400 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      {review.replies} Replies
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg font-bold text-xs text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10">
                      <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg font-bold text-xs text-gray-400 hover:text-rose-400 hover:bg-rose-500/10">
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}