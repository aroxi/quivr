import { FormEvent, useState } from "react";
import { MdAdd } from "react-icons/md";

import Button from "@/lib/components/ui/Button";
import Field from "@/lib/components/ui/Field";
import Modal from "@/lib/components/ui/Modal";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

const AddBrainModal = (): JSX.Element => {
  const [newBrainName, setNewBrainName] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { createBrain } = useBrainContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newBrainName.trim() === "" || isPending) {
      return;
    }
    setIsPending(true);
    await createBrain(newBrainName);
    setNewBrainName("");
    setIsPending(false);
  };

  return (
    <Modal
      Trigger={
        <Button variant={"secondary"}>
          Add New Brain
          <MdAdd className="text-xl" />
        </Button>
      }
      title="Aggiungi cervello"
      desc="Aggiungi un nuovo cervello"
    >
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="my-10 flex items-center gap-2"
      >
        <Field
          name="brainname"
          label="Inserisci il nome"
          autoFocus
          placeholder="E.g. History notes"
          autoComplete="off"
          value={newBrainName}
          onChange={(e) => setNewBrainName(e.currentTarget.value)}
          className="flex-1"
        />
        <Button isLoading={isPending} className="self-end" type="submit">
          Crea
          <MdAdd className="text-xl" />
        </Button>
      </form>
    </Modal>
  );
};

export { AddBrainModal };
