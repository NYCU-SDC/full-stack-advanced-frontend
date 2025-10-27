import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { X, CalendarClock } from "lucide-react";
import { UserCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import type { Task } from "@/types/task.types.ts";
import Status from "@/components/tasks/Status.tsx";
import Label from "@/components/tasks/Label.tsx";
import { users } from "@/mocks/users.ts";

export default function DetailCard({
  setOpenedTaskId,
  task,
}: {
  setOpenedTaskId: Dispatch<SetStateAction<number | undefined>>;
  task: Task;
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(task.description);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [jobStatus, setJobStatus] = useState<typeof task.status>(task.status);
  const [assignee, setAssignee] = useState<string | null>(task.assignee);
  const [isSearchingAssignee, setIsSearchingAssignee] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );
  const [isSelectingDate, setIsSelectingDate] = useState(false);

  const getDescriptionFromLocalStorage = useCallback(() => {
    return localStorage.getItem(`task-${task.id}-description`);
  }, [task.id]);

  const setDescriptionToLocalStorage = useCallback(
    (desc: string) => {
      localStorage.setItem(`task-${task.id}-description`, desc);
    },
    [task.id]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay = 500
  ): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>): void => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // save editing description to local storage with debounce
  const saveDescriptionDebounced = debounce((desc: string) => {
    setDescriptionToLocalStorage(desc);
  }, 500);

  // load description from local storage when isEditingDescription changes
  useEffect(() => {
    if (isEditingDescription) {
      const savedDescription = getDescriptionFromLocalStorage();
      if (savedDescription !== null) {
        setEditedDescription(savedDescription);
      } else {
        setEditedDescription(description);
      }
    }
  }, [isEditingDescription, getDescriptionFromLocalStorage, description]);

  const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  // e.g. "Monday, September 22, 2025"

  // const twFormatter = new Intl.DateTimeFormat("zh-TW", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  // });
  // // e.g. "2025年9月22日 星期一"

  return (
    <Card className="w-md">
      <CardHeader>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">#{task.id}</p>
          <X
            className="text-muted-foreground"
            onClick={() => setOpenedTaskId(undefined)}
            size={16}
          />
        </div>

        {isEditingTitle ? (
          <div className="space-y-2">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button onClick={() => setIsEditingTitle(false)}>Save</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <PencilSquareIcon
              className="size-6 flex-shrink-0"
              onClick={() => setIsEditingTitle(true)}
            />
          </div>
        )}

        <div
          className="flex items-center gap-2 text-sm mb-3 cursor-pointer"
          onClick={() => setIsSelectingDate((prev) => !prev)}
        >
          <CalendarClock size={16} />
          <p>{dateFormatter.format(date)}</p>
        </div>
        {isSelectingDate && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d: Date | undefined) => {
              setDate(d);
              setIsSelectingDate(false);
            }}
            className="rounded-md border shadow-sm"
          />
        )}
        <Select
          value={jobStatus}
          onValueChange={(val: string) =>
            setJobStatus(val as typeof task.status)
          }
        >
          <SelectTrigger>
            <Status status={jobStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INBOX">
              <Status status="INBOX" />
            </SelectItem>
            <SelectItem value="TO_DO">
              <Status status="TO_DO" />
            </SelectItem>
            <SelectItem value="IN_PROGRESS">
              <Status status="IN_PROGRESS" />
            </SelectItem>
            <SelectItem value="DONE">
              <Status status="DONE" />
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <p className="font-bold">Description</p>
          <PencilSquareIcon
            className="size-6 flex-shrink-0"
            onClick={() => setIsEditingDescription(true)}
          />
        </div>
        {isEditingDescription ? (
          <div className="space-y-2">
            <Textarea
              autoResize={true}
              className="resize-none"
              value={editedDescription}
              onChange={(e) => {
                setEditedDescription(e.target.value);
                saveDescriptionDebounced(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                setDescription(editedDescription);
                setIsEditingDescription(false);
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="prose">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
        <p className="font-bold">Detail</p>
        <div className="flex">
          <p className="font-semibold w-1/3">Assignee</p>
          {isSearchingAssignee ? (
            <Command>
              <CommandInput
                placeholder="Search assignee..."
                autoFocus
                onBlur={() => setIsSearchingAssignee(false)}
              />
              <CommandList>
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.name}
                      onPointerDown={(e) => {
                        // handle selection on pointer down so it runs before the
                        // input blur event (which would unmount the list)
                        e.preventDefault();
                        setIsSearchingAssignee(false);
                        setAssignee(user.name);
                      }}
                    >
                      {user.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          ) : (
            <div
              className="flex gap-2.5"
              onClick={() => setIsSearchingAssignee(true)}
            >
              <UserCircleIcon className="size-6" />
              <p>{assignee ?? "Unassigned"}</p>
            </div>
          )}
        </div>
        <div className="flex">
          <p className="font-semibold w-1/3">Labels</p>
          <div className="flex gap-2.5">
            {task.labels.map((label) => (
              <Label label={label} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
