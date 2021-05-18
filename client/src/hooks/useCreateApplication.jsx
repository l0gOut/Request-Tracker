import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CreateApplication, CreateApplicationStatus } from "../Queries";
import { store } from "react-notifications-component";

function useCreateApplication(
  templateData,
  userId,
  setLoading,
  mutationReady,
  setMutationReady
) {
  const [applicationId, setApplicationId] = useState(0);

  const [createApplication, { loading: loadingMutationOne }] = useMutation(
    CreateApplication,
    {
      onCompleted(data) {
        setApplicationId(parseInt(data.createApplication.id));
        createApplicationStatus();
      },
      variables: {
        name: templateData.name,
        description: templateData.description,
        userId: userId,
      },
    }
  );

  const [createApplicationStatus, { loading: loadingMutationTwo }] =
    useMutation(CreateApplicationStatus, {
      onCompleted() {
        setMutationReady(false);
        store.addNotification({
          message: `Заявка с именем "${templateData.name}" была оставлена!`,
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            showIcon: true,
            click: true,
          },
        });
      },
      variables: {
        date: new Date(),
        applicationId: applicationId,
      },
    });

  useEffect(() => {
    setLoading(loadingMutationOne || loadingMutationTwo);
  }, [loadingMutationOne, loadingMutationTwo, setLoading]);

  useEffect(() => {
    if (mutationReady) createApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationReady]);
}

export default useCreateApplication;
