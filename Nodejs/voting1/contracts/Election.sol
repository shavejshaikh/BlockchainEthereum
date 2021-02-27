pragma solidity >=0.4.20 <=0.6.0;

// contract Election {
//     // Model a Candidate
//     struct Candidate {
//         uint id;
//         string name;
//         uint voteCount;
//     }

//     // Store accounts that have voted
//     mapping(address => bool) public voters;
//     // Read/write candidates
//     mapping(uint => Candidate) public candidates;
//     // Store Candidates Count
//     uint public candidatesCount;

//     function Elections() public {
//         addCandidate("Candidate 1");
//         addCandidate("Casndidate 2");
//     }

//     function addCandidate (string memory _name) private {
//         candidatesCount ++;
//         candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
//     }

//     function vote (uint _candidateId) public {
//         // require that they haven't voted before
//         require(!voters[msg.sender]);

//         // require a valid candidate
//         require(_candidateId > 0 && _candidateId <= candidatesCount);

//         // record that voter has voted
//         voters[msg.sender] = true;

//         // update candidate vote Count
//         candidates[_candidateId].voteCount ++;
//     }
// }

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("Narendra Modi");
        addCandidate("Rahul Gandhi");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}