# How to contribute to the Extinction Rebellion volunteer platform. 

This guide explains how you can contribute to the development of the volunteer platform of Extinction Rebellion NL. If you want to learn more about the project and why you contribution matters, please read the [project purpose](https://github.com/xrnl/aginun/wiki/Purpose). 

To contribute in any of the ways specified in this guide you will need a free [Github](https://github.com/) account.

## Reporting a problem

If you have found a problem in the application, fisrt search [the project issues](https://github.com/xrnl/aginun/issues?q=is%3Aissue+is%3Aopen+label%3Abug) to see if it has already been reported. If the problem hasn't been reported, create a [new issue](https://github.com/xrnl/aginun/issues/new) with the following requirements: 

* Use a clear descriptive title explaining the problem.
* Assign the `bug` label to help maintainers distinguish this problem from less urgent issues.  
* Describe the exact steps you took that led to the problem. For example, 1. Opened the application in Firefox 2. Clicked on a role 3. Clicked on the button to apply to the role. Explaining these steps is very important for maintainers to reproduce your problem, examine it and find a way to fix it.  
* Describe what you expected to happen after following all these steps and what actually hapenned. For example, I expcted to find the contact information to apply to the role, but instead the application went back to the list of all roles. 
* Add any additional comments.  

After you submit the issue explaining your problem, you are highly encouraged to develop a fix for the problem. Learn how you can do this in the section [Contributing to the code](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#Contributing-to-the-code). 

## Requesting a feature

If you have an idea for a feature to improve the application, first read the [roadmap](https://github.com/xrnl/aginun/wiki/Roadmap) and the [future functionalities](https://github.com/xrnl/aginun/wiki/Future-functionalities) page to see if your idea will already be developed, and search the [existing suggestions](https://github.com/xrnl/aginun/issues?q=is%3Aopen+is%3Aissue+label%3Asuggestion) to see if it has already been suggested. If you can't find anything, create a [new issue](https://github.com/xrnl/aginun/issues/new) with the following requirements: 

* Use a clear descriptive title explaining your feature. 
* Add the `suggestion` label to help maintainers distinguish your idea from other issues.
* Explain what problem your idea solves.
* Describe a step-by-step use case of your feature. See the [functional specification](https://github.com/xrnl/aginun/wiki/Functional-Specification) for example use cases.  

After you submit your feature request, a project maintainer will give you one of the following answers:

* The feature will be implemented in the current version. In this case you can directly start [developing your feature](https://github.com/xrnl/aginun/wiki/Functional-Specification). 
* The feature will be implemented in a future version, and is added to the page of [future functionalities](https://github.com/xrnl/aginun/wiki/Future-functionalities). In this case you are encouraged not to develop your proposed feature, and instead develop features assigned to the next version, as these have a higher priority. 
* The feature will not be implemented, along with an explanation of why this feature is rejected. 

## Contributing to the code

### Where to contribute best

All features of the application are specified in the [functional specification](https://github.com/xrnl/aginun/wiki/Functional-Specification). From this specifcation, the [roadmap](https://github.com/xrnl/aginun/wiki/Roadmap) for the next version of the application is created. For each feature of the next version, a [Github issue](https://github.com/xrnl/aginun/issues) is created with a milstone assigned to that version. 
  
  * You can contribute best by resolving [issues](https://github.com/xrnl/aginun/issues) with a milestone assigned to the next version. Within these issues:
    * Issues with the [bug](https://github.com/xrnl/aginun/issues?q=is%3Aissue+is%3Aopen+label%3Abug) label have the highest priority.
	* Issues with the [enhancement](https://github.com/xrnl/aginun/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement) label have the lowest priority.
  * If it is your first time contributing, a good place to start is to resolve issues with the [good first issue](https://github.com/xrnl/aginun/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) label. 

### How to contribute

#### Development model

In this project, we use the _fork and pull_ [collaborative development model](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-collaborative-development-models) to make changes to the code. If you haven't worked with this model before, follow [this guide](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/).  

#### Lint and Prettify code

Any code you submit must:
  * Not have any errors detectable by [ESLint](https://eslint.org/). ESLint enables us to easily detect and solve common problems in our code.  
  * Be formatted with [Prettier](https://prettier.io/). We use prettier to have a consistent and automatic code formatting without having to memorize and follow a style guide. 

To easily write code that meets these requirements, follow the [development suggestions in the README](https://github.com/xrnl/aginun#development).

#### Write tests for your code

It is highly recommended that you write unit tests for any code you submit. This will help ensure that any code you write works as expected, and will make it easy to identify if any future changes breaks your code.  

#### Make sure that all tests pass

Before making a pull request, you need to make sure that your changes do not break existing functionality. To do that, [run all tests](https://github.com/xrnl/aginun#testing) and fix your code if any of the tests do not pass. 

#### How to make a pull request

When you make a pull request with your changes you should:
  * Merge into the `master` branch of the `xrnl` repository.
  * Reference any issues that this pull request closes, using one of the [Github issue linking keywords](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).
  * Explain all changes you have made in this pull request. If this pull request changes the interface you should include screenshots of the interface before and after your changes.  
  * Explain why you have made these changes.
  * Explain parts of the code that might be difficult to understand. This makes it much easier for the maintainer to review your code. 

## Contributing without programming 

There are many ways that you can contribute to this project even if you don't have the programming skills required to contribute to the code. You could:
  * Contribute to the [application documentation](https://github.com/xrnl/aginun/wiki): write new documents, or improve existing one by translating them, adding more content or making them easier to read.  
  * Help with the recruitment of people for the [open positions](https://extinctionrebellion.nl/volunteer/) of this project.  
  * Improve the list of [standardized roles](https://drive.google.com/file/d/1KYau2qSltZUTjWH8EcyGhBNnJ_S8PbWR/view) in Extinction Rebellion. 
  * Encourage more local groups of Extinction Rebellion to publish roles through this application.  

If you want to contribute to this project in one of these ways, or any other way, please [get in contact](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#Getting-in-contact). 

## Getting in contact

There are a few ways that you can get in contact with the people working on this project:
  * If you are on the Extinction Rebellion Mattermost, send a message on the [Volunteer platform channel of the xr-netherlands team](https://organise.earth/xr-netherlands/channels/volunteer-platform).
  * Send an email to [tech@extinctionrebellion.nl](mailto:tech@extinctionrebellion.nl).

## Improving this document 

If you want to improve the quality of these guidelines, [make a pull request](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#How-to-make-a-pull-request) with your changes. 


