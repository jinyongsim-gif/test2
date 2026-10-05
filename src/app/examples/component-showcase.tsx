"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 인터랙션이 필요한 컴포넌트 모음 (클라이언트 컴포넌트)
export function ComponentShowcase() {
  const [email, setEmail] = useState("");

  // 폼 제출 시 토스트 알림 표시
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("구독 완료!", { description: `${email} 로 등록되었습니다.` });
    setEmail("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 버튼 & 배지 */}
      <Card>
        <CardHeader>
          <CardTitle>Button & Badge</CardTitle>
          <CardDescription>다양한 변형(variant)을 지원합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </CardContent>
      </Card>

      {/* 폼 & 토스트 */}
      <Card>
        <CardHeader>
          <CardTitle>Form & Toast</CardTitle>
          <CardDescription>Input, Label과 Sonner 토스트 예제</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </CardContent>
          <CardFooter className="mt-4">
            <Button type="submit">구독하기</Button>
          </CardFooter>
        </form>
      </Card>

      {/* 탭 */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>콘텐츠를 탭으로 구분합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">계정</TabsTrigger>
              <TabsTrigger value="settings">설정</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="pt-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Starter Kit</p>
                  <p className="text-sm text-muted-foreground">
                    hello@example.com
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="settings"
              className="pt-3 text-sm text-muted-foreground"
            >
              설정 탭 콘텐츠 영역입니다.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 다이얼로그 */}
      <Card>
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
          <CardDescription>모달 다이얼로그 예제</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              다이얼로그 열기
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>정말 진행할까요?</DialogTitle>
                <DialogDescription>
                  이 작업은 예제이므로 실제로는 아무 일도 일어나지 않습니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  취소
                </DialogClose>
                <DialogClose
                  render={<Button />}
                  onClick={() => toast("확인되었습니다.")}
                >
                  확인
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
