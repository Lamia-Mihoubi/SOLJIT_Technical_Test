const getCandidature = async (req, res) => {
  // TODO: implement try catch around the fetch call
  const query_fields =
    'First_Name__c,Last_Name__c,Year__c,Year_Of_Experience__c';
  const sobject = 'Candidature__c';
  const record_id = 'a004L000002gCJK';
  const response = await fetch(
    `${req.session.instanceUrl}/services/data/v54.0/sobjects/${sobject}/${record_id}?fields=${query_fields}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.session.accessToken,
      },
    },
  );
  const candidate_data = await response.json();
  res.status(200).send(candidate_data);
};
const createCandidature = async (req, res) => {
  // TODO: implement try catch around the fetch call
  const sobject = 'Candidature__c';
  const response = await fetch(
    `${req.session.instanceUrl}/services/data/v54.0/sobjects/${sobject}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.session.accessToken,
      },
      body: {
        First_Name__c: 'Lamia',
        Last_Name__c: 'Mihoubi',
        Year_Of_Experience__c: 1,
      },
    },
  );
  const candidate_data = await response.json();
  res.status(200).send(candidate_data);
};
const getAllCandidatures = async (req, res) => {
  // TODO: implement try catch around the fetch call
  const sobject = 'Candidature__c';
  const response = await fetch(
    `${req.session.instanceUrl}/services/data/v54.0/sobjects/${sobject}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.session.accessToken,
      },
    },
  );
  const candidatures = await response.json();
  res.status(200).send(candidatures);
};

const editCandidature = async (req, res) => {
  // TODO: implement try catch around the fetch call
  const sobject = 'Candidature__c';
  const record_id = 'a004L000002gCJK';

  const response = await fetch(
    `${req.session.instanceUrl}/services/data/v54.0/sobjects/${sobject}/${record_id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.session.accessToken,
      },
      body: {
        Last_Name__c: 'Mihoubi',
      },
    },
  );
  const candidate_data = await response.json();
  res.status(200).send(candidate_data);
};

modules.exports = { getCandidature, createCandidature, getAllCandidatures };
