import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Typesense from '../lib/Typesense'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Documents', function () {
  let typesense
  let documents
  let apiCall
  let mockAxios
  let companySchema = {
    'name': 'companies',
    'num_documents': 0,
    'fields': [
      {
        'name': 'company_name',
        'type': 'string',
        'facet': false
      },
      {
        'name': 'num_employees',
        'type': 'int32',
        'facet': false
      },
      {
        'name': 'country',
        'type': 'string',
        'facet': true
      }
    ],
    'token_ranking_field': 'num_employees'
  }
  let document = {
    'id': '124',
    'company_name': 'Stark Industries',
    'num_employees': 5215,
    'country': 'USA'
  }

  before(function () {
    typesense = new Typesense({
      'masterNode': {
        'host': 'master',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      },
      'readReplicaNodes': [{
        'host': 'read-replica',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      }],
      'timeout': 10
    })
    mockAxios = new MockAxiosAdapter(axios)
    documents = typesense.Documents
    apiCall = typesense.ApiCall
  })

  describe('.search', function () {
    it('searches the documents in a collection', function (done) {
      let searchParameters = {
        'q': 'Stark',
        'query_by': 'company_name'
      }
      let stubbedSearchResult = {
        'facet_counts': [],
        'found': 0,
        'search_time_ms': 0,
        'page': 0,
        'hits': [
          {
            '_highlight': {
              'company_name': '<mark>Stark</mark> Industries'
            },
            'document': {
              'id': '124',
              'company_name': 'Stark Industries',
              'num_employees': 5215,
              'country': 'USA'
            }
          }
        ]
      }
      mockAxios.onGet(apiCall._uriFor('/collections/companies/documents/search'), {params: searchParameters}).reply(200, stubbedSearchResult)

      let returnData = documents.search('companies', searchParameters)

      expect(returnData).to.eventually.deep.equal(stubbedSearchResult).notify(done)
    })
  })
})