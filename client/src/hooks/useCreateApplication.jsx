// import { useState, useEffect } from "react";
// import { useMutation } from "@apollo/client";

// import { CreateApplication, CreateApplicationStatus } from "../Queries";

// export default function useCreateApplication(templateData, userId) {
//   const [applicationId, setApplicationId] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const [createApplication, { loading: loadingMutationOne }] = useMutation(
//     CreateApplication,
//     {
//       onCompleted(data) {
//         setApplicationId(parseInt(data.createApplication.id));
//         createApplicationStatus();
//       },
//       variables: {
//         name: templateData.name,
//         description: templateData.description,
//         userId: userId,
//       },
//     }
//   );

//   const [createApplicationStatus, { loading: loadingMutationTwo }] =
//     useMutation(CreateApplicationStatus, {
//       variables: {
//         date: new Date(),
//         applicationId: applicationId,
//       },
//     });

//   useEffect(() => {
//     setLoading(loadingMutationOne || loadingMutationTwo);
//   }, [loadingMutationOne, loadingMutationTwo]);

//   useEffect(() => createApplication());

//   return loading;
// }
