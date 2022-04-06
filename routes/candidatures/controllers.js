const getCandidature = async (req, res) => {
  const query_fields =
    'First_Name__c,Last_Name__c,Year__c,Year_Of_Experience__c';
  const sobject = 'Candidature__c';
  const record_id = 'a004L000002gCJK';
  const response = await fetch(
    `${req.session.instanceUrl}/services//v42.0/query/?q=SELECT+${query_fields}+${sobject}+where+ID=${record_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.session.accessToken,
      },
    },
  );
  const candidate_data = await response.json();
  res.send(candidate_data);
};
const createCandidature = async (req, res) => {};
const getAllCandidatures = async (req, res) => {};

modules.exports = { getCandidature, createCandidature, getAllCandidatures };
