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

const fetchAllCandidatures = async (instanceUrl, accessToken) => {
  // TODO: implement try catch around the fetch call
  const sobject = 'Candidature__c';
  const response = await fetch(
    `${instanceUrl}/services/data/v54.0/sobjects/${sobject}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    },
  );
  return await response.json();
};
const getAllCandidatures = async (req, res) => {
  const candidatures = fetchAllCandidatures(
    req.session.instanceUrl,
    req.session.accessToken,
  );
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

const searchCandidatures = async (req, res) => {
  // TODO: implement try catch around the fetch call
  const data = fetchAllCandidatures(
    req.session.instanceUrl,
    req.session.accessToken,
  );
  const filters = req.query;

  const filteredCandidatures = data.filter((c) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, c[key], filters[key]);
      isValid = isValid && c[key] == filters[key];
    }
    return isValid;
  });

  res.status(200).send(filteredCandidatures);
};

modules.exports = {
  getCandidature,
  createCandidature,
  getAllCandidatures,
  searchCandidatures,
};
