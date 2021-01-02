# How to contribute to the Extinction Rebellion volunteer platform.

Hey there :wave::smile:, we are excited that you want to contribute to this project! Please read this guide to learn how you can best contribute. In this guide you will find instructions on how to:

- [Join project meetings](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#join-project-meetings)
- [Report a problem](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#report-a-problem)
- [Request a feature](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#request-a-feature)
- [Contribute to the code](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#contribute-to-the-code)
- [Contribute without programming](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#contribute-without-programming)

If you want to get in contact or learn more about the project, check out the [instructions for getting support](https://github.com/xrnl/aginun/blob/master/SUPPORT.md).

## Join project meetings

Every other Tuesday at 19:00 we hold a brief and efficient online meeting to review the progress from the previous 2 weeks, resolve questions about current work, discuss ideas and set goals for the next two weeks. We would like to invite you to this meeting so that you can meet the team, share your ideas and get a warm welcome to the project. You can join the online meeting using [this link](https://meet2.organise.earth/b/tec-cu9-9tr) on the next Tuesday that lands on an [even week number](https://www.epochconverter.com/weeknumbers).

## Report a problem

If you have found a problem in the application, fisrt search [the project issues](https://github.com/xrnl/aginun/issues?q=is%3Aissue+is%3Aopen+label%3Abug) to see if it has already been reported. If the problem hasn't been reported, [create a new issue reporting a problem](https://github.com/xrnl/aginun/issues/new?labels=bug&template=report-a-problem.md).

After you submit the issue explaining your problem, you are very welcome to help solve the problem. In the section [contributing to the code](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#Contributing-to-the-code) you can learn how. 

## Request a feature

If you have an idea for a feature to improve the application, first search the [open issues](https://github.com/xrnl/aginun/issues) and the [future functionalities](https://github.com/xrnl/agiinun/wiki/Future-functionalities) page to see if your idea has already been suggested. If you can't find anything, create a [new issue requesting a feature](https://github.com/xrnl/aginun/issues/new?labels=suggestion&template=request-a-feature.md).

After you submit your feature request, a project maintainer will give you one of the following answers within 2 days:

- The feature will be implemented in the current version. In this case you can directly start [developing your feature](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#Contributing-to-the-code).
- The feature will be implemented in a future version. In this case you are encouraged not to develop your proposed feature, and instead develop features assigned to the next version, as these have a higher priority.
- The feature will not be implemented. The project maintainer will explain why it won't be implemented so that you can understand the decision and appeal the decision if you still think your suggestion should be implemented.

## Contribute to the code

### Prerequisites

First of all, make sure you are familiar with [the technologies](https://github.com/xrnl/aginun/wiki/Architecture#technologies) we use in this application. Of course, you don't need to know all of them, only the ones you need for developing the part of the application that you want to work on.

#### How to contribute without prior experience

Don't worry if you don't have prior experience with these technologies! Contributing to the development of an application is the best way to learn. We recommend that you first learn the basics using the documentation of each technology. Then apply what you learned to resolve one of the [good first issues](https://github.com/xrnl/aginun/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22next+version%22+label%3A%22good+first+issue%22). When you submit your change, more experienced developers will give you constructive feedback and aid you in your learning.

#### How to contribute with other technical skills

If you have experience with technologies that are not used in this application, you can still use them in other tech projects of Extinction Rebellion. Please [get in contact](https://github.com/xrnl/aginun/blob/master/SUPPORT.md) to learn about available opportunities!

### Where to contribute best

All features of the application are specified in the [functional specification](https://github.com/xrnl/aginun/wiki/Functional-Specification). From this specifcation, the [roadmap](https://github.com/xrnl/aginun/wiki/Roadmap) for the next version of the application is created. For each feature of the next version, a [Github issue](https://github.com/xrnl/aginun/issues) is created with a milstone assigned to that version.

- You can contribute best by resolving [issues assigned to the next version](https://github.com/xrnl/aginun/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22next+version%22). Within these issues:
  - Issues with the [bug](https://github.com/xrnl/aginun/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22next+version%22+label%3Abug) label have the highest priority.
  - Issues with the [enhancement](https://github.com/xrnl/aginun/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22next+version%22+label%3Aenhancement) label have the lowest priority.
- If it is your first time contributing, a good place to start is to resolve [good first issues](https://github.com/xrnl/aginun/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22next+version%22+label%3A%22good+first+issue%22).

If you plan to start working on an issue, please leave a comment in that issue so others do not inadvertently work on it at the same time.

### How to contribute

#### 1: Install and run the application

You can install and run the application by following the intructions in the [README](https://github.com/xrnl/aginun#install).

#### 2: Follow the Development model

In this project, we use the _fork and pull_ [collaborative development model](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-collaborative-development-models) to collaboratively change the code. If you haven't worked with this model before, we recommend following [this guide](https://blog.scottlowe.org/2015/01/27/using-fork-branch-git-workflow/).

#### 3: Make your changes

Once you have installed the application and it is configured according to the _fork and pull_ model, you can make your changes to the code.

#### 4: Test your code

It is highly recommended that you write unit tests for any code you submit. This will help ensure that any code you write works as expected, and will make it easy to identify if any future changes breaks your code.

#### 5: Make sure all tests pass

Before submitting your change, you need to make sure that they do not break existing functionality. To do that, [run all tests](https://github.com/xrnl/aginun#test) and fix your code if any of the tests do not pass.

#### 6: Lint and Prettify code

Any code you submit must:

- Not have any errors detectable by [ESLint](https://eslint.org/). ESLint enables us to easily detect and solve common problems in our code.
- Be formatted with [Prettier](https://prettier.io/). We use prettier to have a consistent and automatic code formatting without having to memorize and follow a style guide.

To easily write code that meets these requirements, we recommend using [this setup](https://github.com/xrnl/aginun/wiki/Recommended-setup).

#### 7: Make a pull request

When your code is ready to be submitted, make a pull request with the following details:

1. Merge into the `master` branch of the `xrnl` repository.
2. Reference any issues that this pull request closes, using one of the [Github issue linking keywords](https://help.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).
3. Explain all changes you have made in this pull request. If this pull request changes the interface you should include screenshots of the interface before and after your changes.
4. Explain why you have made these changes.
5. Explain parts of the code that might be difficult to understand. This makes it much easier for the maintainer to review your code.

When you submit or update your pull request, you should receive a reply within 2 days. If the reviewer request changes, you should repeat steps 3 to 6. Note that you don't need to make a new pull request. You can push to your branch and the pull request will be automatically updated with your latest changes.

## Contribute without programming

Contrary to popular belief, you don't need programming skills to contribute to this project, You could:

- Contribute to the [application documentation](https://github.com/xrnl/aginun/wiki): write new documents, or improve existing one by translating them, adding more content or making them easier to read.
- Improve the design of the application.
- Help with the recruitment and integration of new people into this project.
- Improve the list of [standardized roles](https://drive.google.com/file/d/1KYau2qSltZUTjWH8EcyGhBNnJ_S8PbWR/view) in Extinction Rebellion.
- Encourage more local groups of Extinction Rebellion to publish roles through this application.

If you want to contribute to this project in one of these ways, or any other way, please [get in contact](https://github.com/xrnl/aginun/blob/master/SUPPORT.md) with us!

## Improving this document

If you want to improve the quality of this guide, you can simply [make a pull request](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md#How-to-make-a-pull-request) with your changes.

We are very happy you are here,
With love :green_heart:, rage :fire: and respect :seedling:
