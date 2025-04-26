"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Settings } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TaskList from "@/components/task-list";
import { cn } from "@/lib/utils";

export default function Home() {
  const [lists, setLists] = useState(["Personal", "Work", "Groceries"]);
  const [selectedList, setSelectedList] = useState(lists[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const addList = () => {
    if (newListName.trim() !== "") {
      setLists([...lists, newListName]);
      setNewListName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/50/50" alt="Avatar" />
              <AvatarFallback>TF</AvatarFallback>
            </Avatar>
            <CardTitle>TaskFlow</CardTitle>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <div className="pb-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="justify-start w-full" >
                    <Plus className="w-4 h-4 mr-2" />
                    Add List
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New List</DialogTitle>
                  </DialogHeader>
                  <Input placeholder="List Name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
                  <Button onClick={addList} className="mt-4">Create</Button>
                </DialogContent>
              </Dialog>
            </div>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <ScrollArea className="h-[calc(100vh - 200px)]">
              <SidebarMenu>
                {lists.map((list) => (
                  <SidebarMenuButton
                    key={list}
                    onClick={() => setSelectedList(list)}
                    isActive={selectedList === list}
                    className="justify-start"
                  >
                    {list}
                  </SidebarMenuButton>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <Button variant="secondary" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </SidebarFooter>
      </Sidebar>
      <div className="md:pl-64 flex-1">
        <Card className="m-4">
          <CardHeader>
            <CardTitle>{selectedList}</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskList listName={selectedList} />
          </CardContent>
        </Card>
      </div>
    </SidebarProvider>
  );
}
