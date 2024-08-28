import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import tailwindStyles from "../index.css?inline";

export const Widget = () => {
  const [rating, setRating] = useState(0);
  // hover effect where stars filled when user hovers over them
  const [selectedRating, setSelectedRating] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  // Star hover effect functions
  const handleMouseEnter = (index: number) => {
    setSelectedRating(index);
  };
  const handleMouseLeave = () => {
    setSelectedRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index + 1);
  };

  // Handle feedback submit
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const form = ev.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      feedback: formData.get("feedback") as string,
      rating,
    };

    setSubmitted(true);
    console.log(data);
  };

  return (
    <>
      <style>{tailwindStyles}</style>
      <div className="widget fixed bottom-4 right-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full shadow-lg hover:scale-110">
              <MessageCircle className="mr-1 h-5 w-5" /> Feedback
            </Button>
          </PopoverTrigger>
          <PopoverContent className="widget rounded-lg bg-card p-4 shadow-lg w-full max-w-md">
            <style>{tailwindStyles}</style>
            {submitted ? (
              <div>
                <h3 className="text-lg font-bold">
                  Thank you for your feedback!
                </h3>
                <p className="mt-3">
                  We appreciate your feedback. It helps us improve our product
                  and provide better service to our customers.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-center mb-2">
                  Send us your feedback
                </h3>
                <form className="space-y-2" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      name="feedback"
                      className="min-h-[100px]"
                      placeholder="Tell us what you think"
                    />
                  </div>
                  <div className="flex space-x-1 items-center justify-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          "h-5, w-5 cursor-pointer",
                          index <= (selectedRating || rating)
                            ? "fill-primary"
                            : "fill-muted stroke-muted--foreground",
                        )}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave()}
                        onClick={() => handleClick(index)}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
